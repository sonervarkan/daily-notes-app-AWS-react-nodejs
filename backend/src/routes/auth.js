// backend/src/routes/auth.js

const express=require("express");
const router=express.Router();
const db=require("../config/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


router.post("/register", async(req, res) => {
    const {user_name, user_surname, user_email, password}=req.body;
    const created_at=new Date();
    const hashedPassword=await bcrypt.hash(password, 10);
    try
        {
            const [rows]=await db.query(
                "insert into users (user_name, user_surname, user_email, password, created_at) values(?, ?, ?, ?, ?)",
                [user_name, user_surname, user_email, hashedPassword, created_at]);
            const id=rows.insertId;
            res.json({message:"User created", id});
        }
        catch(err)
        {
            console.log(err);
        }
});

router.post("/login", async(req,res)=>{

    const {user_email, password}=req.body;

    if(!user_email || !password)
    {
        return res.status(400).json({message:"Email and password are required"});
    }

    try
    {
        const [rows]=await db.query("select * from users where user_email=?",[user_email]);

        if(rows.length===0)
        {
            return res.status(401).json({message:"Invalid email or password"});
        }

        const user=rows[0];

        const verifiedPassword=await bcrypt.compare(password, user.password);

        if(!verifiedPassword)
        {
            return res.status(401).json({message:"Invalid email or password"});
        }

       const token = jwt.sign(
            { id: user.id, email: user.user_email }, // Token content
            process.env.JWT_SECRET,                  // Private key
            { expiresIn: '1d' }                      // Validity period
        );
        res.json({message:"login succesfull",
            token,
        user:{id:user.user_id,
            name:user.user_name,
            email:user.user_email
        }});
    }
    catch(err)
    {
        console.log(err);
        res.json({ message: "Server error occurred during login." });
    }
});

router.post("/logout", (req, res) => {

    res.json({ message: "Logout successful." });
});


module.exports=router;