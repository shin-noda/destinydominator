import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function Home() {
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

        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError) {
            return;
        }

        if (data && user) {
            const user_id = user.user.id;
            
            // Put an email and user_id into session
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('user_id', user_id);

            navigate("/dashboard");
            return null;
        }

        if (data) {
            // Put an email into session
            sessionStorage.setItem('email', email);

            navigate("/dashboard");
            return null;
        }
    };

    return  (
        <div
            className="login-container"
        >
            <h1>GoalTracker</h1>
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
            <span>Don't have an account? </span>
            <Link to="/register">Register.</Link>
        </div>
        );
};

export default Home;