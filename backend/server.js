const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: "mysessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
  })
);

// DB CONNECTION (UPDATED DB NAME)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "HMS",
});

db.connect((err) => {
  if (err) console.error(err);
  else console.log("Connected to HMS DB");
});

const saltRounds = 10;

//////////////////////////////
// AUTH (UNCHANGED)
//////////////////////////////
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Fill all fields" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Registered successfully",
          userId: result.insertId, // ✅ RETURN ID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  db.query(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid login" });
      }

      const user = result[0];

      try {
        const match = await bcrypt.compare(
          String(password),
          String(user.password)
        );

        if (!match) {
          return res.status(401).json({ message: "Invalid login" });
        }

        // Save session with ID INCLUDED
        req.session.user = {
          id: user.id || user.user_id,   // ✅ IMPORTANT FIX
          username: user.username,
        };

        delete user.password;

        return res.json({
          message: "Login success",
          user: {
            id: user.id || user.user_id,  // ✅ RETURN ID
            username: user.username,
          },
        });
      } catch (error) {
        return res.status(500).json({ message: "Login error" });
      }
    }
  );
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

//////////////////////////////
// DOCTOR API (UPDATED FIELDS)
//////////////////////////////

app.post("/api/doctor", (req, res) => {
  const { doctorname, specialization, telephone, email, hire_date } = req.body;

  if (!doctorname || !specialization || !telephone || !email || !hire_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO doctor
    (doctorname, specialization, telephone, email, hire_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [doctorname, specialization, telephone, email, hire_date],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Doctor added successfully",
        doctor_code: result.insertId
      });
    }
  );
});

app.get("/api/doctor", (req, res) => {
  db.query("SELECT * FROM doctor", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.put("/api/doctor/:id", (req, res) => {
  const id = req.params.id;

  const {
    doctorname,
    specialization,
    telephone,
    email,
    hire_date,
  } = req.body;

  db.query(
    `UPDATE doctor SET doctorname=?, specialization=?, telephone=?, email=?, hire_date=? WHERE doctor_code=?`,
    [doctorname, specialization, telephone, email, hire_date, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Doctor updated" });
    }
  );
});

app.delete("/api/doctor/:id", (req, res) => {
  db.query(
    "DELETE FROM doctor WHERE doctor_code=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Doctor deleted" });
    }
  );
});

//////////////////////////////
// PATIENT API (UPDATED FIELDS)
//////////////////////////////


// GET ALL PATIENTS
app.get("/api/patient", (req, res) => {
  db.query("SELECT * FROM patient", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// CREATE PATIENT
app.post("/api/patient", (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    telephone,
    address,
    registration_date,
  } = req.body;

  db.query(
    `INSERT INTO patient (firstname, lastname, gender, telephone, address, registration_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstname, lastname, gender, telephone, address, registration_date],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Patient added" });
    }
  );
});

// UPDATE PATIENT
app.put("/api/patient/:id", (req, res) => {
  const id = req.params.id;

  const {
    firstname,
    lastname,
    gender,
    telephone,
    address,
    registration_date,
  } = req.body;

  db.query(
    `UPDATE patient 
     SET firstname=?, lastname=?, gender=?, telephone=?, address=?, registration_date=? 
     WHERE patient_id=?`,
    [firstname, lastname, gender, telephone, address, registration_date, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Patient updated" });
    }
  );
});

// DELETE PATIENT
app.delete("/api/patient/:id", (req, res) => {
  db.query(
    "DELETE FROM patient WHERE patient_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Patient deleted" });
    }
  );
});
// ======================
// APPOINTMENT API
// ======================
app.post("/api/appointment", (req, res) => {
  const {
    patient_id,
    doctor_code,
    appointmentdate,
    diagnosis,
    treatment,
    status,
  } = req.body;

  db.query(
    "INSERT INTO appointment (patient_id, doctor_code, appointmentdate, diagnosis, treatment, status) VALUES (?, ?, ?, ?, ?, ?)",
    [patient_id, doctor_code, appointmentdate, diagnosis, treatment, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Appointment created" });
    }
  );
});

app.get("/api/appointment", (req, res) => {
  db.query("SELECT * FROM appointment", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.put("/api/appointment/:id", (req, res) => {
  const id = req.params.id;

  const { patient_id, doctor_code, appointmentdate, diagnosis, treatment, status } =
    req.body;

  db.query(
    "UPDATE appointment SET patient_id=?, doctor_code=?, appointmentdate=?, diagnosis=?, treatment=?, status=? WHERE appointment_id=?",
    [patient_id, doctor_code, appointmentdate, diagnosis, treatment, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Appointment updated" });
    }
  );
});

app.delete("/api/appointment/:id", (req, res) => {
  db.query(
    "DELETE FROM appointment WHERE appointment_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Appointment deleted" });
    }
  );
});
//////////////////////////////
// START SERVER
//////////////////////////////
app.listen(5000, () => {
  console.log("Server running on port 5000");
});