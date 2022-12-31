import express from "express";
import { insertSql, pool } from "./../database/sql";

const router = express.Router();
const db = pool;

router.get("/", async function (req, res) {
  if (req.cookies.user) {
    res.render("insertVehicle", {
      user: req.cookies.user,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async function (req, res) {
  console.log(req.body);

  let myType = "";
  if (req.body.Vin.toString().length !== 9) {
    res.send(
      "<script>alert('Vin은 9자리로 입력해주세요.'); window.location.href='/insertVehicle';</script>"
    );
    return;
  }

  switch (req.body.type) {
    case "car":
      if (
        req.body.Engine_size !== "" &&
        req.body.No_seats === "" &&
        req.body.Tonnage === ""
      ) {
        myType = "car";
      } else if (
        req.body.Engine_size !== "" &&
        (req.body.No_seats !== "" || req.body.Tonnage !== "")
      ) {
        res.send(
          "<script>alert('Engine_size만 입력해주세요.'); window.location.href='/insertVehicle';</script>"
        );
      } else if (req.body.Engine_size === "") {
        res.send(
          "<script>alert('Engine_size를 입력해주세요.'); window.location.href='/insertVehicle';</script>"
        );
      }
      break;
    case "truck":
      if (
        req.body.Tonnage !== "" &&
        req.body.No_seats === "" &&
        req.body.Engine_size === ""
      ) {
        myType = "truck";
      } else if (
        req.body.Tonnage !== "" &&
        (req.body.No_seats !== "" || req.body.Engine_size !== "")
      ) {
        res.send(
          "<script>alert('Tonnage만 입력해주세요.'); window.location.href='/insertVehicle';</script>"
        );
      } else if (req.body.Tonnage === "") {
        res.send(
          "<script>alert('Tonnage를 입력해주세요.'); window.location.href='/insertVehicle';</script>"
        );
      }
      break;
    case "suv":
      if (
        req.body.No_seats !== "" &&
        req.body.Tonnage === "" &&
        req.body.Engine_size === ""
      ) {
        myType = "suv";
      } else if (
        req.body.No_seats !== "" &&
        (req.body.Tonnage !== "" || req.body.Engine_size !== "")
      ) {
        res.send(
          "<script>alert('No_seats만 입력해주세요.'); window.location.href='/insertVehicle';</script>"
        );
      } else if (req.body.No_seats === "") {
        res.send(
          "<script>alert('No_seats를 입력해주세요.'); window.location.href='/insertVehicle';</script>"
        );
      }
      break;
  }
  console.log("myType: ", myType);
  if (myType !== "") {
    try {
      db.getConnection(function (err, conn) {
        conn.beginTransaction(function (err) {
          if (err) throw err;
          else {
            if (!err) {
              insertSql.insertVehicle(req.body);
              switch (myType) {
                case "car":
                  insertSql.insertCar(req.body);
                  conn.commit();
                  break;
                case "truck":
                  insertSql.insertTruck(req.body);
                  conn.commit();
                  break;
                case "suv":
                  insertSql.insertSuv(req.body);
                  conn.commit();
                  break;
              }
              res.send(
                "<script>alert('성공적으로 입력되었습니다.'); window.location.href='/selectTotal';</script>"
              );
            } else {
              conn.rollback();
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
      if (
        err.sqlMessage.includes("Duplicate entry") &&
        err.sqlMessage.includes("PRIMARY")
      ) {
        res.send(
          "<script>alert('해당 Vin을 갖고 있는 차량이 이미 존재합니다.'); window.location.href='/insertVehicle';</script>"
        );
      }
      if (
        err.sqlMessage.includes("Duplicate entry") &&
        err.sqlMessage.includes("UNIQUE")
      ) {
        res.send(
          "<script>alert('해당 License_plate를 갖고 있는 차량이 이미 존재합니다.'); window.location.href='/insertVehicle';</script>"
        );
      }
    }
  }
});

module.exports = router;
