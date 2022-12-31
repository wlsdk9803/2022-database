import express from "express";
import {
  selectSql,
  insertSql,
  deleteSql,
  updateSql,
  pool,
} from "../database/sql";

const router = express.Router();
const db = pool;

router.get("/", async function (req, res) {
  const reservation = await selectSql.getReservation();

  if (req.cookies.user) {
    res.render("selectReservation", {
      user: req.cookies.user,
      reservation,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async function (req, res) {
  console.log(req.cookies.user);
  console.log(req.body);

  db.getConnection(function (err, conn) {
    conn.beginTransaction(function (err) {
      if (err) throw err;
      else {
        if (!err) {
          deleteSql.deleteReservation(req.body.purchaseBtn || req.body.failBtn);
          if (req.body.purchaseBtn) {
            insertSql.insertPurchase(req);
          }
          if (req.body.failBtn) {
            updateSql.updateVehicleAvailable(req.body.failBtn);
          }
          conn.commit();
          res.redirect("/selectReservation");
        } else {
          conn.rollback();
        }
      }
    });
  });
});

module.exports = router;
