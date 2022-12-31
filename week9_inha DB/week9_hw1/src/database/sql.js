import mysql from "mysql2";

//데이터베이스 연결
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "qkr581100@@",
  database: "inha",
});

//async / await 사용
const promisePool = pool.promise();

//select query
export const selectSql = {
  getBuilding: async () => {
    const sql = `select * from building`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getClass: async () => {
    const sql = `select * from class`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getClass_has_room: async () => {
    const sql = `select * from class_has_room`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getClub: async () => {
    const sql = `select * from club`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getDepartment: async () => {
    const sql = `select * from department`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getDepartment_has_employee: async () => {
    const sql = `select * from department_has_employee`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getDepartment_has_student: async () => {
    const sql = `select * from department_has_student`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getEmployee: async () => {
    const sql = `select * from employee`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getEmployee_has_class: async () => {
    const sql = `select * from employee_has_class`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getEmployee_has_room: async () => {
    const sql = `select * from employee_has_room`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getRoom: async () => {
    const sql = `select * from room`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getStudent: async () => {
    const sql = `select * from student limit 10`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getStudent_has_class: async () => {
    const sql = `select * from student_has_class limit 10`;
    const [result] = await promisePool.query(sql);

    return result;
  },

  getStudent_has_club: async () => {
    const sql = `select * from student_has_club`;
    const [result] = await promisePool.query(sql);

    return result;
  },
};

//insert query
export const insertSql = {
  setStudent: async (data) => {
    const sql = `insert into student (Name, Email, Phone_number, Major, Student_Id, Employee_Id) values (
            "${data.Name}", "${data.Email}", "${data.Phone_number}", "${data.Major}",
            "${data.Student_Id}", "${data.Employee_Id}"
        )`;

    await promisePool.query(sql);
  },

  setBuilding: async (data) => {
    const sql = `insert into building (Name) values (
            "${data.Name}"
        )`;

    await promisePool.query(sql);
  },
};

//update query
export const updateSql = {
  updateStudent: async (data) => {
    let isName, isEmail, isPhone_number, isMajor, isStudent_Id, isEmployee_Id;
    console.log(data);
    if (data.Name) {
      //name을 update 할 때
      data.Email ||
      data.Phone_number ||
      data.Major ||
      data.Student_Id ||
      data.Employee_Id //이후 값들이 있으면 ,를 붙여줌
        ? (isName = `Name = "${data.Name}", `)
        : (isName = `Name = "${data.Name}" `);
    } else isName = ""; //name을 update 하지 않을 때

    if (data.Email) {
      data.Phone_number || data.Major || data.Student_Id || data.Employee_Id
        ? (isEmail = `Email = "${data.Email}", `)
        : (isEmail = `Email = "${data.Email}" `);
    } else isEmail = "";

    if (data.Phone_number) {
      data.Major || data.Student_Id || data.Employee_Id
        ? (isPhone_number = `Phone_number = "${data.Phone_number}", `)
        : (isPhone_number = `Phone_number = "${data.Phone_number}" `);
    } else isPhone_number = "";

    if (data.Major) {
      data.Student_Id || data.Employee_Id
        ? (isMajor = `Major = "${data.Major}", `)
        : (isMajor = `Major = "${data.Major}" `);
    } else isMajor = "";

    if (data.Student_Id) {
      data.Employee_Id
        ? (isStudent_Id = `Student_Id = "${data.Student_Id}", `)
        : (isStudent_Id = `Student_Id = "${data.Student_Id}" `);
    } else isStudent_Id = "";

    if (data.Employee_Id) {
      isEmployee_Id = `Employee_Id = "${data.Employee_Id}" `;
    } else isEmployee_Id = "";

    const sql = `update student set ${isName}${isEmail}${isPhone_number}${isMajor}${isStudent_Id}${isEmployee_Id}where Id='1'`;

    console.log(sql);
    if (
      isName ||
      isEmail ||
      isPhone_number ||
      isMajor ||
      isStudent_Id ||
      isEmployee_Id
    )
      await promisePool.query(sql);
  },
};
