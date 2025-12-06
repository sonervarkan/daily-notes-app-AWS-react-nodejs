// backend/src/routes/notes.js
const express=require("express");
const router=express.Router();
const authenticateToken = require("../middleware/authMiddleware");


// AWS CONNECTION KODS
const { readNotes, writeNotes } = require("../config/s3");

// GET
router.get("/list-notes", authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await readNotes(userId);
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: "Failed to read notes" });
    }
});

// POST
router.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
        let notes = await readNotes(userId);

        const newNote = {
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toISOString(),
        };

        notes.push(newNote);

        await writeNotes(userId, notes);

        res.json({ message: "Note created", note: newNote });
    } catch (err) {
        res.status(500).json({ error: "Failed to add note" });
    }
});

// PUT
router.put("/update-note/:id", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const id = Number(req.params.id);
    const { title, content } = req.body;

    try {
        let notes = await readNotes(userId);
        let updated = notes.map(n =>
            n.id === id ? { ...n, title, content } : n
        );

        await writeNotes(userId, updated);

        res.json({ message: "Note updated" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update note" });
    }
});

// DELETE
router.post("/delete-note/:id", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const id = Number(req.params.id);

    try {
        let notes = await readNotes(userId);
        let updated = notes.filter(n => n.id !== id);

        await writeNotes(userId, updated);

        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete note" });
    }
});

module.exports=router;
/*
// MYSQL CONNECTION KODS 
const db=require("../config/db");

router.get("/list-notes", authenticateToken, async(req, res) => {
    const user_id=req.user.id;
    try
    {
        const [rows]=await db.query("select * from notes where user_id=?",[user_id]);
        res.json(rows);
    }
    catch(err)
    {
        console.log(err);
    }
});

router.post("/add-note", authenticateToken, async(req, res) => {
    const {title, content}=req.body;
    const user_id=req.user.id;
    const created_at=new Date();
    try
    {
        const [rows]=await db.query(
            "insert into notes (title, content, user_id, created_at) values(?, ?, ?, ?)",
            [title, content, user_id, created_at]);
        const id=rows.insertId;
        res.json({message:"Note created", id});
    }
    catch(err)
    {
        console.log(err);
    }
});

router.put("/update-note/:id", authenticateToken, async(req,res)=>{
    const id=req.params.id;
    const {title, content}=req.body;
    const user_id=req.user.id;
    try
    {
        const [rows]=await db.query(
            "update notes set title=?, content=? where id=? and user_id=?",
            [title, content, id, user_id]);
        res.json({message:"Note updated"});
    }
    catch(err)
    {
        console.log(err);
    }
});

router.post("/delete-note/:id", authenticateToken, async(req,res)=>{
    const id=req.params.id;
    const user_id=req.user.id;
    try
    {
        const [rows]=await db.query(
            "delete from notes where id=? and user_id=?",
            [id, user_id]);
        res.json({message:"Note deleted"});
    }
    catch(err)
    {
        console.log(err);
    }
});
*/
