const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
const authRoutes = require("./routes/auth");
const createUsersRoutes = require("./routes/createUsers");
const uploadRoutes = require("./routes/upload");
const downloadRoutes = require("./routes/download");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const promoRoutes = require("./routes/promo");
const scheduleRoutes = require("./routes/schedule");
const subjectRoutes = require("./routes/subject");
const groupRoutes = require("./routes/group");
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const salleRoutes = require("./routes/salle");
const fileRoutes = require("./routes/file");
const chapterRoutes = require("./routes/chapter");
const journalRouters = require("./routes/journal");
const gradeRoutes = require("./routes/grade");

app.use(cors());
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/add", createUsersRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/salle", salleRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/journal", journalRouters);
app.use("/api/grade", gradeRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/download", downloadRoutes);

// connect to mongoDB and start the server on port 4000
const port = 4000;
mongoose
  .connect("mongodb://127.0.0.1:27017/elearn", {
    keepAlive: true,
  })
  .then((result) => {
    app.listen(port);
    console.log("Server is running on port %s", port);
    //console.log("result : %s", result);
  })
  .catch((err) => console.log(err));
