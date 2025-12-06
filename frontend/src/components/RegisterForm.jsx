// frontend/src/components/RegisterForm.jsx

import react, { useState } from "react";
import { registerUser } from "../api/authApi";

const RegisterForm = () => {
    const [user_name, setName] = useState("");
    const [user_surname, setSurname] = useState("");
    const [user_email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const data= await registerUser({user_name, user_surname, user_email, password});

            setMessage(`✅ Kayıt Başarılı: ${data.message}`);

            setName(""); // Clear form 
            setSurname("");
            setEmail("");
            setPassword("");
        }catch(error)
        {
            setMessage(`❌ Kayıt Hatası: ${error}`);
            console.error("Kayıt Hatası:", error);
        }
    }

    return (
        <div class="register">
            <h2>Register</h2>
            <form>
                <label>Name</label>
                <input type="text" value={user_name} onChange={e=>setName(e.target.value)}/>
                <label>Surname</label>
                <input type="text" value={user_surname} onChange={e=>setSurname(e.target.value)}/>
                <label>Email</label>
                <input type="email" value={user_email} onChange={e=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="text" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
            {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default RegisterForm;
