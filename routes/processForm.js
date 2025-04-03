// this where I handle my forms, more specifically the form of registration

const express = require('express');
const router = express.Router();

const fs = require('fs');
const file = "users.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


/*
This function is to create the tables that we need for the data base.
Normally, the db only creates the tables once.
We might want to add/modify the tables to store the friends requests, the messages, etc. as well.
But honestly, I don't know if this belongs here (I will ask the TA's about it this friday).
*/
db.serialize(function(){
    if(!exists){
        /*
            I created the db in such a way that the user can choose several hobbies and follow several course
            but also that the courses can be followed by several students and the several students can have the same hobby.
            That's what the StudentHobby and StudentCourse tables are for.
        */
        db.run(`
            CREATE TABLE Student (
                studentId INTEGER PRIMARY KEY,
                firstName TEXT,
                last_name TEXT,
                email TEXT UNIQUE,
                photo TEXT DEFAULT "public/pictures/Taha.jpeg",
                major TEXT,
                password TEXT
            );

            CREATE TABLE Hobby (
                hobbyId INTEGER PRIMARY KEY,
                descr TEXT
            );

            CREATE TABLE Course (
                courseId INTEGER PRIMARY KEY,
                descr TEXT
            );

            CREATE TABLE StudentHobby (
                studentId INTEGER,
                hobbyId INTEGER,
                PRIMARY KEY (studentId, hobbyId),
                FOREIGN KEY (studentId) REFERENCES Student(studentId) ON DELETE CASCADE,
                FOREIGN KEY (hobbyId) REFERENCES Hobby(hobbyId) ON DELETE CASCADE
            );
            
            CREATE TABLE StudentCourse (
                studentId INTEGER,
                courseId INTEGER,
                PRIMARY KEY (studentId, courseId),
                FOREIGN KEY (studentId) REFERENCES Student(studentId) ON DELETE CASCADE,
                FOREIGN KEY (courseId) REFERENCES Course(courseId) ON DELETE CASCADE
            );
        `);
    }
})


//here is a small test to check if the database works...and it does !!! UwU
router.post('/', function(req, res, next) {
  db.serialize(function() {
    var firstName = req.body.name;
    db.run(`
        INSERT INTO Student (firstName)
        VALUES
            ("${firstName}");
    `);
  });
  db.each("SELECT * from Student", function(err, row) {
    res.send("hello: "+row.firstName);
  })
});







module.exports = router;