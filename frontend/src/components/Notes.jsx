// frontend/src/components/Notes.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { addNote, listNotes, updateNote, deleteNote } from "../api/notesApi";
import "../App.css";

const Notes = () => {
    
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { user, logout } = useAuth();
    const [editId, setEditId] = useState(null);

    const fetchNotes = async () => {
        try {
            const data = await listNotes();
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) fetchNotes();
    }, [user]);

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!title || !content) return;
        try {
            if (editId) {
                await updateNote(editId, title, content); // ✔ update
            } 
            else {
                await addNote(title, content); // ✔ add
            }
            setTitle("");
            setContent("");
            setEditId(null);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditNote = (note) => {
        setEditId(note.id);
        setTitle(note.title);
        setContent(note.content);
    }
  

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            fetchNotes(); // refresh list
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return <p>Please log in.</p>;

    return (
        <div>
            <nav class="nav">
                <h3>Welcome, {user.name}</h3>
                <button onClick={logout}>Logout</button>
            </nav>
            <div class="notes">
                <h2>{editId ? "Edit Note" : "Add Not"}</h2>

                <form onSubmit={handleAddNote}>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label>Content</label>
                    <input value={content} onChange={(e) => setContent(e.target.value)} />

                    <button type="submit">{editId ? "Update Note" : "Add Note"}</button>
                    {editId && (<button type="button" onClick={() => {
                            setEditId(null);
                            setTitle("");
                            setContent("");
                        }}>
                            Cancel
                        </button>)}
                </form>
                
                <h2>Notes</h2>
                <ul>
                    {notes.map((note) => (
                        <li key={note.id}>
                            <b>{note.title}</b>: {note.content}
                            <button onClick={() => handleEditNote(note)}> Edit </button>
                            <button onClick={() => handleDelete(note.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notes;
