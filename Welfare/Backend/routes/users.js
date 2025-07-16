const express = require("express");
const router = express.Router();
const db= require("../db");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({storage});

//POST route to save new user
router.post("/", upload.single("profile"),  (req, res) => {
    const {
        fullName, 
        IDNo,
        PhoneNo,
        location,
        fieldOfficer
    } = req.body;

    const profilePicURL = req.file ? req.file.path : null;
    //Parse Stringified dependents
    const newDependent = JSON.parse(req.body.dependents);

    try {
        const [userResult] =  db.query(
            'INSERT INTO users (FullName, IDNo, PhoneNo,Location, FieldOfficer, profilePic_URL) VALUES (?, ?, ?, ?, ?, ?)',
            [fullName, IDNo, PhoneNo, location, fieldOfficer, profilePicURL]
        );
        const userID = userResult.insertId;
        //Insert dependents if any
        if (newDependent.length > 0) {
            for (const dep of newDependent){
                 db.query(
                    'INSERT INTO dependents (userID, Name, relationship, DOB, ID) VALUES (?, ?, ?, ?, ?)',
                    [userID, dep.Name, dep.relationship, dep.DOB, dep.ID]
                );
            }
        }
        res.status(200).json("User created successfully");
} catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Failed to save user"});
}
});

//To get all users
router.get("/", (req, res) => {
    const q= "SELECT * from users";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//To delete a user
router.delete("/:id", (req, res) => {
    const userID = req.params.id;
    const q = "DELETE from users WHERE id = ?";
    db.query(q, [userID], (err, data) => {
        if (err) return res.json(err);
        return res.json("User has been deleted successfully");
    })
})

// To Edit a user
router.put("/:id", upload.single("profile"), (req, res) => {
    const userID = req.params.id;
    const {
        fullName, 
        IDNo,
        PhoneNo,
        location,
        fieldOfficer
    } = req.body;
    const profilePicURL = req.file ? req.file.path : null;
    const q = "UPDATE users set `FullName` = ?, `IDNo`= ?, 'PhoneNo' = ?, 'Location' = ?, 'FieldOfficer'= ?, 'profilePic_URL'= ? WHERE id = ?";
    const newValues = [fullName, IDNo, PhoneNo, location, fieldOfficer, profilePicURL, userID]
    db.query(q, [newValues], (err, data) => {
        if (err) return res.json(err);
        return res.json("User has been edited successfully");
    })
})

module.exports = router;