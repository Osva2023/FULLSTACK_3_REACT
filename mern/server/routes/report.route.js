// REPORT ROUTE
import express from "express";
import  { getReportData}  from "../controller/report.controller.js";

const reportRoutes = express.Router();

reportRoutes.get("/api/report-data", getReportData);

export default reportRoutes;