const express = require("express");
const router = express.Router();
const db= require("../db");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({storage});

router.post("/", upload.single("profile"), (req, res) => {
    const {
        fullName, 
        IDNo,
        PhoneNo,
        location,
        fieldOfficer,
        newDependent = []
    } = req.body;

    const profilePicURL = `http://localhost:4000/uploads/${req.file.filename}`;

    db.beginTransaction(err => {
        if (err) return res.status(500).send(err);

        const userQuery =`
        INSERT INTO Users (FullName, IDNo, PhoneNo, Location, FieldOfficer, profilePic_URL)
        VALUES (?, ?, ?, ?, ?, ?) `;

        const user = [fullName, IDNo, PhoneNo, location, fieldOfficer, profilePicURL];
        db.query(userQuery, user, (err, result) => {
            if (err) return db.rollback(()=> res.status(500).send(err));
            const userId =  result.insertId;

            const depQuery = `
            INSERT INTO dependents (name, relationship, dob, national_ID, profile_URL )
            VALUES ?`;
            const depValues = newDependent.map(dep =>[
                userId,
                dep.name, 
                dep.relationship,
                dep.DOB,
                dep.ID,
                dep.profile
            ]);
            db.query(depQuery, [depValues], err => {
                if (err) return db.rollback(()=> res.status(500).send(err));

                db.commit(()=> {
                    res.send ("User and Dependents Saved");
                });
            });
        });
    });
});

module.exports = router;