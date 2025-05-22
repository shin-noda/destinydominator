import React from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    };

    return (
        <div>
            <h1>Welcome :)</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default Dashboard;