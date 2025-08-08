// const express = require("express");
// const app = express();
// const port = 3000;
// app.get("/page", (req, res) =>{
//  res.sendFile("./index.html", { root:__dirname});
// });

// app.listen(port, ()=>{
// console.log(`http://localhost:${port}`)
// })

const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

const dbpath = path.join(__dirname, "userdata.db");

let db = null;

const InitializeDBandServer =  async () =>{
    try{
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        });
        app.listen(3000, () =>{
            console.log("Server is running at http://localhost:3000/");
        });
    }catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};
InitializeDBandServer();
// Serve static files from a "public" folder (adjust if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//GET method
app.get('/userdetails/', async (req, res) => {
    const querie = `SELECT * FROM user;`;
    const UserArray = await db.all(querie);
    res.send(UserArray);
    
});


//post method
app.post('/submit-form', async (req, res) =>{
    const Userdetails = req.body;
    const { 
        
        email,
        password
        } = Userdetails;
    
    const Adduser = `
    INSERT INTO user (email, password)
    VALUES ('${email}', '${password}');
    `;
    const result = await db.run(Adduser);
    res.send(result);
})

app.post('/login', async (req, res) => {
    const { password, email } = req.body;
    
    // Database lo user ni find cheyadaniki query
    const selectUserQuery = `
        SELECT * FROM user 
        WHERE password = '${password}' AND email = '${email}';
    `;
    
    const user = await db.get(selectUserQuery);
    
    if (user === undefined) {
        // User lekapothe error message pampali
        res.status(401).send("Invalid password or email");
    } else {
        // User unte success message pampali
        res.status(200).send("Login successful!");
    }
});


//Put method
app.put('/Udate_userdetails/:user_id', async (req, res) =>{
    const {user_id} = req.params;
    const Userdetails = req.body;

    const {
        name,
        email, 
    } = Userdetails;
    const updateUser = `
        UPDATE user
        SET 
        name = '${name}',
        email = '${email}'
        WHERE user_id = ${user_id};
    `;
    await db.run(updateUser);
    res.send("Book Updated Successfully")
})

app.delete('/deleteUser/:user_id', async (req, res) =>{
    const {user_id} = req.params;
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