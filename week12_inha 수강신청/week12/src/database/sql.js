import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: "localhost",
    user: "root",
    database: "inha",
    password: "qkr581100@@",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);

// async / await 사용
const promisePool = pool.promise();

// insert
export const insertSql = {
  insertStudent_has_class: async (data) => {
    let studentName = data.cookies.user;
    let classId = data.body.classId;

    let Class_Department_Id;
    switch (classId) {
      case "1":
      case "3":
      case "5":
        Class_Department_Id = 1;
        break;
      case "2":
        Class_Department_Id = 2;
        break;
      case "4":
        Class_Department_Id = 3;
        break;
    }

    let studentId;
    switch (studentName) {
      case "박진아":
        studentId = 1;
        break;
      case "최유경":
        studentId = 2;
        break;
      case "김은서":
        studentId = 3;
        break;
    }
    const [rows] = await promisePool.query(
      `insert into student_has_class (Student_Id, Class_Id, Class_Department_Id) values ('${studentId}', '${classId}', '${Class_Department_Id}')`
    );
    return rows;
  },
};

// update
export const updateSql = {
  updateClass: async (data) => {
    const [rows] = await promisePool.query(
      `update class set Number_of_participants=Number_of_participants+1, Extra_seat=Extra_seat-1 where Id = '${data}'`
    );
    return rows;
  },
};

// select
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from student`);

    return rows;
  },
  getClass: async () => {
    const sql = `select * from class`;
    const [result] = await promisePool.query(sql);

    return result;
  },
  getStudent_has_class: async (data) => {
    let id;
    switch (data) {
      case "박진아":
        id = "1";
        break;
      case "최유경":
        id = "2";
        break;
      case "김은서":
        id = "3";
        break;
    }
    const sql = `select * from student_has_class where student_id='${id}'`;
    const [result] = await promisePool.query(sql);

    return result;
  },
};
