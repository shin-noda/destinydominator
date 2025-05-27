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

        let isUsed = await checkIfEmailIsTaken();

        if (!isUsed) {
            await createNewUser();
        };
    };

    const checkIfEmailIsTaken = async () => {
        // Check if the email is already in use
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email);

        // Email is already in use.
        if (data.length != 0) {
            setMessage("This email is already taken. Please use a different one.");
            return true;
        }

        return false;
    };

    const createNewUser = async () => {
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

        // Inseat a new user into a table
        await insertNewUser();

        // Clear the fields
        setEmail("");
        setPassword("");
    };

    const insertNewUser = async () => {
        const { data, error } = await supabase
            .from('User')
            .insert({ email: email })
            .select();
    };

    return (
        <div
            className="register-container"
        >
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