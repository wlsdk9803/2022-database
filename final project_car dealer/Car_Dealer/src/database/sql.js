import mysql from "mysql2";

// 데이터베이스 연결
export const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: "localhost",
    user: "root",
    database: "car_dealer",
    password: "qkr581100@@",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: "date",
  }
);
const promisePool = pool.promise();

// insert
export const insertSql = {
  insertReservation: async (data) => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;

    let ssn;
    switch (data.cookies.user) {
      case "Jina":
        ssn = "123456789";
        break;
      case "John":
        ssn = "345567881";
        break;
      case "Frank":
        ssn = "554433771";
        break;
      case "Judy":
        ssn = "77412365";
        break;
      case "James":
        ssn = "989765432";
        break;
    }

    let sidList = [
      "111555999",
      "137954624",
      "224455786",
      "870960555",
      "888666444",
    ];
    let sid_idx = Math.floor(Math.random() * 5);
    let sid = sidList[sid_idx];

    const [rows] = await promisePool.query(
      `insert into reservation (reservation_date, vehicle_Vin, salesperson_sid, customer_Ssn) values ('${dateString}', '${data.body.Vin}', '${sid}', '${ssn}')`
    );
    return rows;
  },
  insertPurchase: async (data) => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;

    let ssn;
    switch (data.cookies.user) {
      case "Jina":
        ssn = "123456789";
        break;
      case "John":
        ssn = "345567881";
        break;
      case "Frank":
        ssn = "554433771";
        break;
      case "Judy":
        ssn = "77412365";
        break;
      case "James":
        ssn = "989765432";
        break;
    }
    const [rows] = await promisePool.query(
      data.cookies.user === "관리자"
        ? `insert into sold_out (soldout_date, vehicle_Vin, salesperson_sid, customer_Ssn) values ('${dateString}', '${data.body.purchaseBtn}', '${data.body.salesperson_sid}', '${data.body.customer_Ssn}')`
        : `insert into sold_out (soldout_date, vehicle_Vin, salesperson_sid, customer_Ssn) values ('${dateString}', '${data.body.purchaseBtn}', '${data.body.salesperson_sid}', '${ssn}')`
    );
    return rows;
  },
  insertVehicle: async (data) => {
    const [rows] = await promisePool.query(
      `insert into vehicle (Vin, Price, Model, License_plate, reservation_availability, type) values ('${data.Vin}', '${data.Price}', '${data.Model}', '${data.License_plate}', '${data.reservation_availability}', '${data.type}')`
    );
    return rows;
  },
  insertCar: async (data) => {
    const [rows] = await promisePool.query(
      `insert into car (Engine_size, vehicle_Vin) values ('${data.Engine_size}', '${data.Vin}')`
    );
    return rows;
  },
  insertTruck: async (data) => {
    const [rows] = await promisePool.query(
      `insert into truck (Tonnage, vehicle_Vin) values ('${data.Tonnage}', '${data.Vin}')`
    );
    return rows;
  },
  insertSuv: async (data) => {
    const [rows] = await promisePool.query(
      `insert into suv (No_seats, vehicle_Vin) values ('${data.No_seats}', '${data.Vin}')`
    );
    return rows;
  },
};

// update
export const updateSql = {
  updateVehicleUnavailable: async (data) => {
    console.log("updateVehicleUnavailable:", data);
    const [rows] = await promisePool.query(
      `update vehicle set reservation_availability = 'no' where Vin = '${data}'`
    );
    return rows;
  },
  updateVehicleAvailable: async (data) => {
    console.log("updateVehicleAvailable:", data);
    const [rows] = await promisePool.query(
      `update vehicle set reservation_availability = 'yes' where Vin = '${data}'`
    );
    return rows;
  },
  updateVehicle: async (data) => {
    let isPrice, isModel, isLicense_plate, isReservation_availability, isType;
    if (data.Price) {
      data.Model ||
      data.License_plate ||
      data.reservation_availability ||
      data.type
        ? (isPrice = `Price = "${data.Price}", `)
        : (isPrice = `Price = "${data.Price}" `);
    } else isPrice = "";
    if (data.Model) {
      data.License_plate || data.reservation_availability || data.type
        ? (isModel = `Model = "${data.Model}", `)
        : (isModel = `Model = "${data.Model}" `);
    } else isModel = "";
    if (data.License_plate) {
      data.reservation_availability || data.type
        ? (isLicense_plate = `License_plate = "${data.License_plate}", `)
        : (isLicense_plate = `License_plate = "${data.License_plate}" `);
    } else isLicense_plate = "";
    if (data.reservation_availability) {
      data.type
        ? (isReservation_availability = `reservation_availability = "${data.reservation_availability}", `)
        : (isReservation_availability = `reservation_availability = "${data.reservation_availability}" `);
    } else isReservation_availability = "";
    if (data.type) {
      isType = `type = "${data.type}"`;
    } else isType = "";

    const [rows] = await promisePool.query(
      `update vehicle set ${isPrice}${isModel}${isLicense_plate}${isReservation_availability}${isType} where Vin = '${data.update}'`
    );
    return rows;
  },
  updateCar: async (data) => {
    const [rows] = await promisePool.query(
      `update car set Engine_size = '${data.Engine_size}' where vehicle_Vin = '${data.update}'`
    );
    return rows;
  },
  updateTruck: async (data) => {
    const [rows] = await promisePool.query(
      `update truck set Tonnage = '${data.Tonnage}' where vehicle_Vin = '${data.update}'`
    );
    return rows;
  },
  updateSuv: async (data) => {
    const [rows] = await promisePool.query(
      `update suv set No_seats = '${data.No_seats}' where vehicle_Vin = '${data.update}'`
    );
    return rows;
  },
  updateReservation: async (data) => {
    let isReservation_date, isSalesperson_sid, isCustomer_Ssn;
    if (data.reservation_date) {
      data.salesperson_sid || data.customer_Ssn
        ? (isReservation_date = `reservation_date = "${data.reservation_date}", `)
        : (isReservation_date = `reservation_date = "${data.reservation_date}" `);
    } else isReservation_date = "";
    if (data.salesperson_sid) {
      data.customer_Ssn
        ? (isSalesperson_sid = `salesperson_sid = "${data.salesperson_sid}", `)
        : (isSalesperson_sid = `salesperson_sid = "${data.salesperson_sid}" `);
    } else isSalesperson_sid = "";
    if (data.customer_Ssn) {
      isCustomer_Ssn = `customer_Ssn = "${data.customer_Ssn}"`;
    } else isCustomer_Ssn = "";

    const [rows] = await promisePool.query(
      `update reservation set ${isReservation_date}${isSalesperson_sid}${isCustomer_Ssn} where vehicle_Vin = '${data.update}'`
    );
    return rows;
  },
};

// select
export const selectSql = {
  getLogin: async (data) => {
    const [rows] = await promisePool.query(`select * from login`);
    return rows;
  },
  getAvailableVehicle: async () => {
    const sql = `select * from vehicle where reservation_availability = 'yes' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAvailableCar: async () => {
    const sql = `select Vin, Price, Model, License_plate, type, Engine_size from vehicle join car on car.vehicle_Vin=vehicle.Vin where reservation_availability='yes' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAvailableTruck: async () => {
    const sql = `select Vin, Price, Model, License_plate, type, Tonnage from vehicle join truck on truck.vehicle_Vin=vehicle.Vin where reservation_availability='yes' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAvailableSuv: async () => {
    const sql = `select Vin, Price, Model, License_plate, type, No_seats from vehicle join suv on suv.vehicle_Vin=vehicle.Vin where reservation_availability='yes' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getMyPurchase: async (data) => {
    let ssn;
    switch (data) {
      case "Jina":
        ssn = "123456789";
        break;
      case "John":
        ssn = "345567881";
        break;
      case "Frank":
        ssn = "554433771";
        break;
      case "Judy":
        ssn = "77412365";
        break;
      case "James":
        ssn = "989765432";
        break;
    }
    const sql = `select * from sold_out_detail where customer_Ssn = '${ssn}'`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getMyReservation: async (data) => {
    let ssn;
    switch (data) {
      case "Jina":
        ssn = "123456789";
        break;
      case "John":
        ssn = "345567881";
        break;
      case "Frank":
        ssn = "554433771";
        break;
      case "Judy":
        ssn = "77412365";
        break;
      case "James":
        ssn = "989765432";
        break;
    }
    const sql = `select * from reservation_detail where customer_Ssn = '${ssn}'`;
    const [result] = await promisePool.query(sql);

    return result;
  },
  getMyInformation: async (data) => {
    let ssn;
    switch (data) {
      case "Jina":
        ssn = "123456789";
        break;
      case "John":
        ssn = "345567881";
        break;
      case "Frank":
        ssn = "554433771";
        break;
      case "Judy":
        ssn = "77412365";
        break;
      case "James":
        ssn = "989765432";
        break;
    }
    const sql = `select Ssn, name, State, Street, City, userId, replace(password, right(password, 4), '****') as password from customer where Ssn = '${ssn}'`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getTotalVehicle: async () => {
    const sql = `select * from vehicle limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getTotalCar: async () => {
    const sql = `select Vin, Price, Model, License_plate, reservation_availability, type, Engine_size from vehicle join car on car.vehicle_Vin=vehicle.Vin where type='car' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getTotalTruck: async () => {
    const sql = `select Vin, Price, Model, License_plate, reservation_availability, type, Tonnage from vehicle join truck on truck.vehicle_Vin=vehicle.Vin where type='truck' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getTotalSuv: async () => {
    const sql = `select Vin, Price, Model, License_plate, reservation_availability, type, No_seats from vehicle join suv on suv.vehicle_Vin=vehicle.Vin where type='suv' limit 100`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getReservation: async () => {
    const sql = `select * from reservation`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getSoldout: async () => {
    const sql = `select * from sold_out_detail`;
    const [result] = await promisePool.query(sql);
    return result;
  },
};

//delete
export const deleteSql = {
  deleteMyReservation: async (data) => {
    let vin = data.body.delBtn || data.body.purchaseBtn;

    let ssn;
    switch (data.cookies.user) {
      case "Jina":
        ssn = "123456789";
        break;
      case "John":
        ssn = "345567881";
        break;
      case "Frank":
        ssn = "554433771";
        break;
      case "Judy":
        ssn = "77412365";
        break;
      case "James":
        ssn = "989765432";
        break;
    }
    const [rows] = await promisePool.query(
      `delete from reservation where vehicle_Vin = '${vin}' and customer_Ssn = '${ssn}'`
    );
    return rows;
  },
  deleteReservation: async (data) => {
    const [rows] = await promisePool.query(
      `delete from reservation where vehicle_Vin = '${data}'`
    );
    return rows;
  },
  deleteVehicle: async (data) => {
    const [rows] = await promisePool.query(
      `delete from vehicle where Vin = '${data}'`
    );
    return rows;
  },
  deleteCar: async (data) => {
    const [rows] = await promisePool.query(
      `delete from car where vehicle_Vin = '${data}'`
    );
    return rows;
  },
  deleteTruck: async (data) => {
    const [rows] = await promisePool.query(
      `delete from truck where vehicle_Vin = '${data}'`
    );
    return rows;
  },
  deleteSuv: async (data) => {
    const [rows] = await promisePool.query(
      `delete from suv where vehicle_Vin = '${data}'`
    );
    return rows;
  },
  deleteReservation: async (data) => {
    const [rows] = await promisePool.query(
      `delete from reservation where vehicle_Vin = '${data}'`
    );
    return rows;
  },
  deleteSoldOut: async (data) => {
    const [rows] = await promisePool.query(
      `delete from sold_out where vehicle_Vin = '${data}'`
    );
    return rows;
  },
};
