import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get("/", async (_req, res) => {
  const building = await selectSql.getBuilding();
  const myclass = await selectSql.getClass(); //class는 변수명으로 사용할 수 없으므로 myclass로 대체
  const class_has_room = await selectSql.getClass_has_room();
  const club = await selectSql.getClub();
  const department = await selectSql.getDepartment();
  const department_has_employee = await selectSql.getDepartment_has_employee();
  const department_has_student = await selectSql.getDepartment_has_student();
  const employee = await selectSql.getEmployee();
  const employee_has_class = await selectSql.getEmployee_has_class();
  const employee_has_room = await selectSql.getEmployee_has_room();
  const room = await selectSql.getRoom();
  const student = await selectSql.getStudent();
  const student_has_class = await selectSql.getStudent_has_class();
  const student_has_club = await selectSql.getStudent_has_club();

  res.render("select", {
    title: "building",
    title2: "class",
    title3: "class_has_room",
    title4: "club",
    title5: "department",
    title6: "department_has_employee",
    title7: "department_has_student",
    title8: "employee",
    title9: "employee_has_class",
    title10: "employee_has_room",
    title11: "room",
    title12: "student",
    title13: "student_has_class",
    title14: "student_has_club",
    building,
    myclass,
    class_has_room,
    club,
    department,
    department_has_employee,
    department_has_student,
    employee,
    employee_has_class,
    employee_has_room,
    room,
    student,
    student_has_class,
    student_has_club,
  });
});

module.exports = router;
