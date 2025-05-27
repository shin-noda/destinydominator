import React, { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import Goal from "../components/Goal.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState("");
    const [showInput, setShowInput] = useState(false);

    // Load goals once on start
    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Goal')
            .select('*');
        
        // set data
        setGoals(data.map(item => ({ id: item.id, goalText: item.name })));
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    };

    const handleAddGoal = () => {
        setShowInput(true);
    };

    const handleCreateGoal = async (e) => {
        e.stopPropagation();
        setShowInput(false);

        // If the user didn't type anything, it just closes the box.
        if (goalText && goalText.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Goal')
                .insert({ name: goalText, is_achieved: false })
                .select();

            const trimmedGoal = data.map(goal => ({
                id: goal.id,
                goalText: goal.name
            }));

            // Display updated a list of goals
            setGoals([...goals, ...trimmedGoal]);
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
        setGoalText("");
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
                    <Goal
                        key={index} 
                        id={goal.id} 
                        goalText={goal.goalText}
                    />
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