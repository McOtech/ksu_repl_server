const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    page: "Home Page",
  });
});

app.post("/students", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const regNo = req.body.regno;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      return res.json({ error: "error retreiving the details" });
    }
    const students = JSON.parse(data).students;
    res.json(students.filter((stud) => stud.regno === regNo)[0]);
  });
});

app.post("/staff", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const payrollNumber = req.body.payroll;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      return res.json({ error: "error retreiving the details" });
    }
    const staff = JSON.parse(data).staff;
    res.json(staff.filter((employee) => employee.payroll === payrollNumber)[0]);
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
