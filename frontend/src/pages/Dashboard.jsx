import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import Goal from "../components/Goal.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState("");
    const [showInput, setShowInput] = useState(false);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    };

    const handleAddGoal = () => {
        setShowInput(true);
    };

    const handleCreateGoal = (e) => {
        e.stopPropagation();
        setShowInput(false);

        // If the user didn't type anything, it just closes the box.
        if (goalText) {
            setGoals([...goals, <Goal />]);
        }

        setGoalText("");
    }

    const handleInputChange = (e) => {
        setGoalText(e.target.value);
    }

    const handleCancelGoal = (e) => {
        // This stops calling the parent element.
        e.stopPropagation();
        setShowInput(false);
    };

    return (
        <div>
            <h1>Welcome :)</h1>
            <div className="container">
                <div
                    className="create-goal-container"
                    onClick={handleAddGoal}
                >
                    {showInput ? (
                        <>
                            <input
                                className="input-field"
                                type="text"
                                value={goalText}
                                onChange={handleInputChange}
                                placeholder="Type your goal"
                                maxLength="50"
                            />
                            <br></br>
                            <button
                                className="add-goal-button"
                                onClick={handleCreateGoal}
                            >
                                Add
                            </button>
                            <button
                                className="cancel-goal-button"
                                onClick={handleCancelGoal}
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <>+ Add a goal</>
                    )}
                </div>
                {goals.map((goal, index) => (
                    <React.Fragment key={index}>
                        {goal}
                    </React.Fragment>
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