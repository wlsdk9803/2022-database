import express from "express";
import { selectSql, deleteSql, updateSql, pool } from "../database/sql";

const router = express.Router();
const db = pool;

router.get("/", async function (req, res) {
  const getTotalSuv = await selectSql.getTotalSuv();

  if (req.cookies.user) {
    res.render("selectTotalSuv", {
      user: req.cookies.user,
      getTotalSuv,
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
            deleteSql.deleteSuv(req.body.delete);
            deleteSql.deleteReservation(req.body.delete);
            deleteSql.deleteSoldOut(req.body.delete);
            //서브타입 먼저 삭제하고 슈퍼타입 삭제
            deleteSql.deleteVehicle(req.body.delete);
            conn.commit();
            res.send(
              "<script>alert('삭제되었습니다.'); window.location.href='/selectTotalSuv';</script>"
            );
          } else {
            conn.rollback();
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
      req.body.type === "" &&
      req.body.No_seats === ""
    ) {
      res.send(
        "<script>alert('데이터를 입력한 후 수정해주세요.'); window.location.href='/selectTotalSuv';</script>"
      );
    } else {
      try {
        //car 테이블만 수정
        if (
          req.body.Price === "" &&
          req.body.Model === "" &&
          req.body.License_plate === "" &&
          req.body.reservation_availability === "" &&
          req.body.type === "" &&
          req.body.No_seats !== ""
        ) {
          await updateSql.updateSuv(req.body);
        }
        //vehicle 테이블만 수정
        if (
          (req.body.Price !== "" ||
            req.body.Model !== "" ||
            req.body.License_plate !== "" ||
            req.body.reservation_availability !== "" ||
            req.body.type !== "") &&
          req.body.No_seats === ""
        ) {
          await updateSql.updateVehicle(req.body);
        }
        //둘 다 수정
        if (
          (req.body.Price !== "" ||
            req.body.Model !== "" ||
            req.body.License_plate !== "" ||
            req.body.reservation_availability !== "" ||
            req.body.type !== "") &&
          req.body.No_seats !== ""
        ) {
          conn.beginTransaction(function (err) {
            if (err) throw err;
            else {
              if (!err) {
                updateSql.updateSuv(req.body);
                updateSql.updateVehicle(req.body);
                conn.commit();
              } else {
                conn.rollback();
              }
            }
          });
        }
        res.send(
          "<script>alert('수정되었습니다.'); window.location.href='/selectTotalSuv';</script>"
        );
      } catch (err) {
        if (
          err.sqlMessage.includes("Duplicate entry") &&
          err.sqlMessage.includes("UNIQUE")
        ) {
          res.send(
            "<script>alert('해당 License_plate를 갖고 있는 차량이 이미 존재합니다.'); window.location.href='/selectTotalSuv';</script>"
          );
        }
      }
    }
  }
});

module.exports = router;
