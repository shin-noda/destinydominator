import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        // Prevent from reloading
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            // Clear the fields
            setEmail("");
            setPassword("");
            return;
        }

        if (data) {
            navigate("/dashboard");
            return null;
        }
    };

    return  (
        <div
            className="login-container"
        >
            <h2>Login</h2>
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
                    Log In
                </button>
            </form>
            <br></br>
            <span>Don't have an account?</span>
            <Link to="/register">Register.</Link>
        </div>
        );
};

export default Login;