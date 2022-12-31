import express from "express";
import { selectSql, insertSql, updateSql, pool } from "../database/sql";

const router = express.Router();
const db = pool;

router.get("/", async function (req, res) {
  const getAvailableVehicle = await selectSql.getAvailableVehicle();

  if (req.cookies.user) {
    res.render("selectAvailable", {
      user: req.cookies.user,
      getAvailableVehicle,
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
          updateSql.updateVehicleUnavailable(req.body.Vin);
          insertSql.insertReservation(req);
          conn.commit();
        } else {
          conn.rollback();
        }
      }
    });
  });
  res.send(
    "<script>alert('예약되었습니다.'); window.location.href='/myReservation';</script>"
  );
});

module.exports = router;
