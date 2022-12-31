// Copyright 2021 kms
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import { insertSql, updateSql } from "../database/sql";
import { selectSql } from "../database/sql";
// TODO
// sql import

const router = express.Router();

router.get("/", async function (req, res) {
  // TODO
  // class 정보 불러오기
  const myclass = await selectSql.getClass();
  const student_has_class = await selectSql.getStudent_has_class(
    req.cookies.user
  );

  if (req.cookies.user) {
    // TODO
    // 불러온 class 정보 같이 넘겨주기
    res.render("select", {
      user: req.cookies.user,
      myclass,
      student_has_class,
    });
  } else {
    res.render("/");
  }
});

router.post("/", async function (req, res) {
  console.log(req.cookies.user);
  console.log(req.body);

  const users = await selectSql.getStudent_has_class(req.cookies.user);
  let checkMyclass = false;
  console.log("users: ", users);

  users.map((user) => {
    console.log("user.classId: ", user.Class_Id);
    if (req.body.classId == user.Class_Id) {
      checkMyclass = true;
    }
  });

  console.log("checkMyclass:", checkMyclass);
  if (checkMyclass) {
    //이미 수강신청한 경우
    res.send(
      "<script>alert('이미 신청한 강의입니다.'); window.location.href='/sugang';</script>"
    );
  } else if (!checkMyclass && req.body.extraSeat > 0) {
    //아직 신청하지 않았는데 여석도 있는 경우
    await insertSql.insertStudent_has_class(req);
    await updateSql.updateClass(req.body.classId);
    res.redirect("/sugang");
  } else if (req.body.extraSeat <= 0) {
    //여석이 없는 경우
    res.send(
      "<script>alert('여석이 부족합니다.'); window.location.href='/sugang';</script>"
    );
  }
});

module.exports = router;
