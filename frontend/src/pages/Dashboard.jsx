import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import Goal from "../components/Goal.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [goals, setGoals] = useState([]);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    };

    function handleAddCard() {
        setGoals([...goals, <Goal />]);
    };

    return (
        <div>
            <h1>Welcome :)</h1>
            <div className="container">
                <div
                    className="create-goal-container"
                    onClick={handleAddCard}
                >
                    + Add a goal
                </div>
                {goals.map((goal, index) => (
                    <React.Fragment key={index}>{goal}</React.Fragment>
                ))}
                
            </div>
            <button
                className="signout-button"
                onClick={signOut}
            >
                Sign Out
            </button>
        </div>
    );
};

export default Dashboard;