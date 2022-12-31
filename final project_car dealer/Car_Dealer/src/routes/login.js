import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";
import { selectSql } from "../database/sql";

const router = express.Router();

// 쿠키 및 세션 설정
router.use(cookieParser());
router.use(
  expressSession({
    secret: "dilab",
    resave: true,
    saveUninitialized: true,
  })
);

router.get("/", (req, res) => {
  if (req.cookies.user && req.cookies.user !== "관리자") {
    res.render("customerMain", { user: req.cookies.user });
  } else if (req.cookies.user && req.cookies.user === "관리자") {
    res.render("adminMain", { user: req.cookies.user });
  } else {
    res.render("login");
  }
});

router.get("/logout", (req, res) => {
  if (req.cookies.user) {
    res.clearCookie("user");
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  const vars = req.body;

  const users = await selectSql.getLogin();
  let whoAmI = "";
  let checkLogin = false;

  users.map((user) => {
    if (vars.id === user.userId && vars.password === user.password) {
      checkLogin = true;
      whoAmI = user.name;
    }
  });

  if (checkLogin) {
    res.cookie("user", whoAmI, {
      expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
      httpOnly: true,
    });
    res.redirect("/");
  } else {
    res.send(
      "<script>alert('아이디 또는 비밀번호를 다시 확인해주세요.'); window.location.href='/';</script>"
    );
  }
});

module.exports = router;
