import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get("/", async function (req, res) {
  const reservation = await selectSql.getReservation();

  if (req.cookies.user) {
    res.render("updateReservation", {
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

  if (
    req.body.salesperson_sid === "" &&
    req.body.customer_Ssn === "" &&
    req.body.reservation_date === ""
  ) {
    res.send(
      "<script>alert('데이터를 입력한 후 수정해주세요.'); window.location.href='/updateReservation';</script>"
    );
  } else {
    try {
      await updateSql.updateReservation(req.body);
      res.send(
        "<script>alert('수정되었습니다.'); window.location.href='/updateReservation';</script>"
      );
    } catch (err) {
      console.log(err);
      if (err.sqlMessage.includes("too long")) {
        res.send(
          "<script>alert('salesperson_sid 또는 customer_Ssn은 9자 이내로 작성해주세요.'); window.location.href='/updateReservation';</script>"
        );
      }
      if (err.sqlMessage.includes("Incorrect date value")) {
        res.send(
          "<script>alert('날짜 형식이 올바르지 않습니다.'); window.location.href='/updateReservation';</script>"
        );
      }
      if (
        err.sqlMessage.includes("FOREIGN KEY") &&
        err.sqlMessage.includes("customer_Ssn") &&
        err.sqlMessage.includes("salesperson_sid")
      ) {
        res.send(
          "<script>alert('해당 salesperson_sid을 갖고 있는 직원과 해당 customer_Ssn을 갖고 있는 고객이 없습니다.'); window.location.href='/updateReservation';</script>"
        );
      } else if (
        err.sqlMessage.includes("FOREIGN KEY") &&
        err.sqlMessage.includes("salesperson_sid")
      ) {
        res.send(
          "<script>alert('해당 salesperson_sid을 갖고 있는 직원이 없습니다.'); window.location.href='/updateReservation';</script>"
        );
      } else if (
        err.sqlMessage.includes("FOREIGN KEY") &&
        err.sqlMessage.includes("customer_Ssn")
      ) {
        res.send(
          "<script>alert('해당 customer_Ssn을 갖고 있는 고객이 없습니다.'); window.location.href='/updateReservation';</script>"
        );
      }
    }
  }
});

module.exports = router;
