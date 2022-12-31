import express from "express";
import { selectSql, deleteSql, updateSql, pool } from "../database/sql";

const router = express.Router();
const db = pool;

router.get("/", async function (req, res) {
  const getTotalVehicle = await selectSql.getTotalVehicle();

  if (req.cookies.user) {
    res.render("selectTotal", {
      user: req.cookies.user,
      getTotalVehicle,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async function (req, res) {
  console.log(req.body);

  //삭제버튼을 눌렀을 때
  if (req.body.delete) {
    db.getConnection(function (err, conn) {
      conn.beginTransaction(function (err) {
        if (err) throw err;
        else {
          if (!err) {
            deleteSql.deleteCar(req.body.delete);
            deleteSql.deleteTruck(req.body.delete);
            deleteSql.deleteSuv(req.body.delete);
            deleteSql.deleteReservation(req.body.delete);
            deleteSql.deleteSoldOut(req.body.delete);
            //서브타입 먼저 삭제하고 슈퍼타입 삭제
            deleteSql.deleteVehicle(req.body.delete);
            conn.commit();
            res.send(
              "<script>alert('삭제되었습니다.'); window.location.href='/selectTotal';</script>"
            );
          }
        }
      });
    });
  }

  //수정버튼을 눌렀을 때
  if (req.body.update) {
    if (
      req.body.Price === "" &&
      req.body.Model === "" &&
      req.body.License_plate === "" &&
      req.body.reservation_availability === "" &&
      req.body.type === ""
    ) {
      res.send(
        "<script>alert('데이터를 입력한 후 수정해주세요.'); window.location.href='/selectTotal';</script>"
      );
    } else {
      try {
        await updateSql.updateVehicle(req.body);
        res.send(
          "<script>alert('수정되었습니다.'); window.location.href='/selectTotal';</script>"
        );
      } catch (err) {
        if (
          err.sqlMessage.includes("Duplicate entry") &&
          err.sqlMessage.includes("UNIQUE")
        ) {
          res.send(
            "<script>alert('해당 License_plate를 갖고 있는 차량이 이미 존재합니다.'); window.location.href='/selectTotal';</script>"
          );
        }
      }
    }
  }
});

module.exports = router;
