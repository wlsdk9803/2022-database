import mysql from "mysql2";

//데이터베이스 연결
const pool = mysql.createPool({
  host: "localhost",
  //port: 3306,
  user: "root",
  password: "qkr581100@@",
  database: "week10",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//async / await 사용
const promisePool = pool.promise();

//select query
export const selectSql = {
  getUsers: async () => {
    //const sql = `select * from employee`;
    const [rows] = await promisePool.query(`select * from user`);

    return rows;
  },

  getDepartment: async () => {
    //const sql = `select * from department`;
    const [rows] = await promisePool.query(`select * from department`);

    return rows;
  },
};

export const deleteSql = {
  deleteDepartment: async (data) => {
    console.log("deleteSql.deleteDepartment: ", data.Dnumber);
    const sql = `delete from department where Dnumber = ${data.Dnumber}`;

    await promisePool.query(sql);
  },
};
