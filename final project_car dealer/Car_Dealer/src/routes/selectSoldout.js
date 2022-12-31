import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get("/", async function (req, res) {
  const soldout = await selectSql.getSoldout();

  if (req.cookies.user) {
    res.render("selectSoldout", {
      user: req.cookies.user,
      soldout,
    });
  } else {
    res.render("/");
  }
});

module.exports = router;
