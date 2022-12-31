import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get("/", async function (req, res) {
  const myInformation = await selectSql.getMyInformation(req.cookies.user);

  if (req.cookies.user) {
    res.render("myInformation", {
      user: req.cookies.user,
      myInformation,
    });
  } else {
    res.render("/");
  }
});

module.exports = router;
