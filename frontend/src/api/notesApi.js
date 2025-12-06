// frontend/src/api/notesApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const notesApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const setToken = (token) => {
  notesApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


export const addNote = async (title, content) => {
    const response = await notesApi.post("/notes/add-note", { title, content });
    return response.data;
};

export const listNotes = async () => {
    const response = await notesApi.get("/notes/list-notes");
    return response.data;
};

export const updateNote = async (id, title, content) => {
    const response = await notesApi.put(`/notes/update-note/${id}`, { title, content});
    return response.data;
}

export const deleteNote = async (id) => {
    const response = await notesApi.post(`/notes/delete-note/${id}`);
    return response.data;
}
export default notesApi;