import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get("/", async function (req, res) {
  const myPurchase = await selectSql.getMyPurchase(req.cookies.user);

  if (req.cookies.user) {
    res.render("myPurchase", {
      user: req.cookies.user,
      myPurchase,
    });
  } else {
    res.render("/");
  }
});

module.exports = router;
