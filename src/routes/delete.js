import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

router.get("/", async (req, res) => {
  const department = await selectSql.getDepartment();

  res.render("delete", {
    title: "삭제 가능",
    department,
  });
});

router.post("/", async (req, res) => {
  console.log("delete router:", req.body.delBtn);

  const data = {
    Dnumber: req.body.delBtn,
  };

  await deleteSql.deleteDepartment(data);

  res.redirect("/delete");
});

module.exports = router;
