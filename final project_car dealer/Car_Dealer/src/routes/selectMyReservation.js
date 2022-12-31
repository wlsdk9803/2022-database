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
  const myReservation = await selectSql.getMyReservation(req.cookies.user);

  if (req.cookies.user) {
    res.render("selectMyReservation", {
      user: req.cookies.user,
      myReservation,
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
          deleteSql.deleteMyReservation(req);
          if (req.body.delBtn) {
            updateSql.updateVehicleAvailable(req.body.delBtn);
            conn.commit();
            res.send(
              "<script>alert('예약이 취소되었습니다.'); window.location.href='/myReservation';</script>"
            );
          }
          if (req.body.purchaseBtn) {
            insertSql.insertPurchase(req);
            conn.commit();
            res.send(
              "<script>alert('구매가 완료되었습니다.'); window.location.href='/myPurchase';</script>"
            );
          }
        } else {
          conn.rollback();
        }
      }
    });
  });
});

module.exports = router;
