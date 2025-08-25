const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cors());

const dbpath = path.join(__dirname, "userdata.db");

let db = null;

const InitializeDBandServer = async () => {
    try {
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => {
            console.log("Server is running at http://localhost:3000/");
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};
InitializeDBandServer();


//GET method
app.get('/userdetails/', async (req, res) => {
    const querie = `SELECT * FROM user;`;
    const UserArray = await db.all(querie);
    res.send(UserArray);

});


//post method
app.post('/submit-form', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const selectUserQuery = `SELECT * FROM user WHERE email = '${email}';`;
        const existingUser = await db.get(selectUserQuery);
        if(existingUser === undefined) {
            const Adduser = `
            INSERT INTO user (email, password)
            VALUES ('${email}', '${hashedPassword}');
        `;

        const result = await db.run(Adduser);
        res.status(201).send("User added successfully!");
        }
        
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Internal Server Error");
    }
});



//login FORM
app.post('/login', async (req, res) => {
    const { password, email } = req.body;

    const selectUserQuery = `
        SELECT * FROM user 
        WHERE email = '${email}';
    `;

    const user = await db.get(selectUserQuery);
    if (user === undefined) {

        res.status(401).send("Invalid password or email");
    } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid === true) {
            const payload = {
                email: email,
            };
            const jwtToken = jwt.sign(payload, "my_secret_key");
            res.send({
                jwtToken: jwtToken,
                message: "Login successful",
            });
        } else {
            res.status(401).send("Invalid password or email");
        }
    }
});


//Put method
app.put('/Udate_userdetails/', async (req, res) => {
  try{
    const Userdetails = req.body;

    const {
        password,email
    } = Userdetails;
    const updateUser = `
        UPDATE user
        SET 
        password = '${password}'
        WHERE email = '${email}';
    `;
    await db.run(updateUser);
    res.send("Book Updated Successfully")
} catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.delete('/deleteUser/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const deleteUser = `
    DELETE FROM user WHERE user_id = ${user_id};`;
    await db.run(deleteUser);
    res.send("User Deleted Successfully");
})



// //table creation
// app.get("/create-table", async (req, res) => {
//   const createUserTableQuery = `
//     CREATE TABLE user (
//       user_id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       email TEXT NOT NULL UNIQUE
//     );
//   `;
//   try {
//     await db.run(createUserTableQuery);
//     res.send("✅ User table created successfully.");
//   } catch (e) {
//     res.status(500).send(`❌ Error creating table: ${e.message}`);
//   }
// });

// LOGOUT
app.post("/logout", (req, res) => {
    // Since JWT is stateless, logout just means client deletes the token
    res.send({ message: "Logged out successfully" });
});
