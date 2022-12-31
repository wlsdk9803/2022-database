import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get("/student", async (_req, res) => {
  const student_res = await selectSql.getStudent();
  res.render("updateStudent", {
    title: "student 테이블 갱신",
    student_res,
  });
});

router.post("/student", async (req, res) => {
  const vars = req.body;
  const data = {
    Name: vars.Name,
    Email: vars.Email,
    Phone_number: vars.Phone_number,
    Major: vars.Major,
    Student_Id: vars.Student_Id,
    Employee_Id: vars.Employee_Id,
  };
  await updateSql.updateStudent(data);

  res.redirect("/update/student");
});

module.exports = router;
