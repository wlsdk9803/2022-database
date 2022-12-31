import express from "express";
import logger from "morgan";
import path from "path";
import liveReload from "livereload";
import connectLiveReload from "connect-livereload";

import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import selectAvailableRouter from "./routes/selectAvailable";
import selectAvailableCarRouter from "./routes/selectAvailableCar";
import selectAvailableTruckRouter from "./routes/selectAvailableTruck";
import selectAvailableSuvRouter from "./routes/selectAvailableSuv";
import myPurchaseRouter from "./routes/myPurchase";
import selectMyReservationRouter from "./routes/selectMyReservation";
import myInformationRouter from "./routes/myInformation";
import selectTotalRouter from "./routes/selectTotal";
import insertVehicleRouter from "./routes/insertVehicle";
import selectReservationRouter from "./routes/selectReservation";
import updateReservationRouter from "./routes/updateReservation";
import selectSoldoutRouter from "./routes/selectSoldout";
import selectTotalCarRouter from "./routes/selectTotalCar";
import selectTotalTruckRouter from "./routes/selectTotalTruck";
import selectTotalSuvRouter from "./routes/selectTotalSuv";

const PORT = 3000;

const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public"))); //hbs에게 css 파일 위치 알려줌

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/logout", logoutRouter);
app.use("/selectAvailable", selectAvailableRouter);
app.use("/selectAvailableCar", selectAvailableCarRouter);
app.use("/selectAvailableTruck", selectAvailableTruckRouter);
app.use("/selectAvailableSuv", selectAvailableSuvRouter);
app.use("/myPurchase", myPurchaseRouter);
app.use("/myReservation", selectMyReservationRouter);
app.use("/myInformation", myInformationRouter);
app.use("/selectTotal", selectTotalRouter);
app.use("/insertVehicle", insertVehicleRouter);
app.use("/selectReservation", selectReservationRouter);
app.use("/updateReservation", updateReservationRouter);
app.use("/selectSoldout", selectSoldoutRouter);
app.use("/selectTotalCar", selectTotalCarRouter);
app.use("/selectTotalTruck", selectTotalTruckRouter);
app.use("/selectTotalSuv", selectTotalSuvRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
