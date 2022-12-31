import express from "express";
import { insertSql } from "../database/sql";

const router = express.Router();

router.get("/", (_req, res) => {
  res.render("home");
});

router.post("/", (req, res) => {
  const vars = req.body;
  const var_length = Object.keys(req.body).length;

  if (var_length > 1) {
    const data = {
      Name: vars.Name,
      Email: vars.Email,
      Phone_number: vars.Phone_number,
      Major: vars.Major,
      Student_Id: vars.Student_Id,
      Employee_Id: vars.Employee_Id,
    };
    insertSql.setStudent(data);
  } else {
    const data = {
      Name: vars.Name,
    };
    insertSql.setBuilding(data);
  }
  res.redirect("/");
});

module.exports = router;
