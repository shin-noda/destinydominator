import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        // Prevent from reloading
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data) {
            setMessage("User account created!");
        }

        // Clear the fields
        setEmail("");
        setPassword("");
    };

    return (
        <div>
            <h2>Register</h2>
            <br></br>
            {message && <span>{message}</span>}
            <form onSubmit={handleSubmit}>
                <input
                    className='input-field'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email" 
                    placeholder="Email" 
                    required 
                />
                <br></br>
                <input
                    className='input-field'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password" 
                    placeholder="Password" 
                    required 
                />
                <br></br>
                <button
                    className="process-button"
                    type="submit"
                >
                    Create Account
                </button>
            </form>
            <br></br>
            <span>Already have an account?</span>
            <Link to="/login">Log in.</Link>
        </div>
    );
};

export default Register;