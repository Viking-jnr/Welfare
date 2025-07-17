const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ['jpg', 'png']
    },
});

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});*/
const upload = multer({ storage });

router.post("/", upload.single("profile"), async (req, res) => {
  const { fullName, IDNo, PhoneNo, location, fieldOfficer } = req.body;
  const profilePicURL = req.file?.path || null;
  const newDependent = JSON.parse(req.body.dependents || "[]");

  try {
    const userResult = await db.query(
      `INSERT INTO users ("FullName", "IDNo", "PhoneNo", "Location", "FieldOfficer", "profilePic_URL") 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [fullName, IDNo, PhoneNo, location, fieldOfficer, profilePicURL]
    );
    const userID = userResult.rows[0].id;

    for (const dep of newDependent) {
      await db.query(
        `INSERT INTO dependents ("userID", "Name", "relationship", "DOB", "ID") 
         VALUES ($1, $2, $3, $4, $5)`,
        [userID, dep.Name, dep.relationship, dep.DOB, dep.ID]
      );
    }

    res.status(200).json("User created successfully");
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Get all users
/*router.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});*/
router.get("/", (req, res)=>{
  const q = "SELECT * FROM users";
  db.query(q,(err, data) =>{
    if (err) return res.json(err);
    return res.json(data);
  })
})

// Delete a user
router.delete("/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    await db.query('DELETE FROM users WHERE id = $1', [userID]);
    res.json("User has been deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit a user
router.put("/:id", upload.single("profile"), async (req, res) => {
  const userID = req.params.id;
  const { fullName, IDNo, PhoneNo, location, fieldOfficer } = req.body;
  const profilePicURL = req.file ? req.file.path : null;

  try {
    await db.query(
      `UPDATE users 
       SET "FullName" = $1, "IDNo" = $2, "PhoneNo" = $3, "Location" = $4, 
           "FieldOfficer" = $5, "profilePic_URL" = $6 
       WHERE id = $7`,
      [fullName, IDNo, PhoneNo, location, fieldOfficer, profilePicURL, userID]
    );
    res.json("User has been edited successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
