import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import Goal from "../components/Goal.jsx";
import Navigationbar from "../components/Navigationbar.jsx";

function Dashboard() {
    const [id, setId] = useState(0);
    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState("");
    const [showInput, setShowInput] = useState(false);

    // Load goals once on start
    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        const userId = await getUserId();

        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Goal')
            .select('*')
            .eq('user_id', userId)
            .order('id');
        
        // set data
        setGoals(data.map(item => ({ id: item.id, goalText: item.name })));
    };

    const getUserId = async () => {
        const email = sessionStorage.getItem('email');

        // Retrieve a user data based on the email
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email);

        setId(parseInt(data[0].id));

        // Looks like this is unnecessary but this is required since setId is not "fast" enough to update the id when it retrieves data in loadGoals
        return parseInt(data[0].id);
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
                .insert({ name: goalText, is_achieved: false, user_id: id })
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
            <Navigationbar />
            <h1
                className="top-message"
            >
                Welcome :)
            </h1>
            <div className="container">
                <div
                    className="create-goal-container"
                    onClick={handleAddGoal}
                >
                    {showInput ? (
                        <>
                            <input
                                className="block-input-field"
                                type="text"
                                value={goalText}
                                onChange={handleInputChange}
                                placeholder="Type your goal"
                                maxLength="50"
                            />
                            <br></br>
                            <button
                                className="add-button"
                                onClick={handleCreateGoal}
                            >
                                Add
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelGoal}
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <div className="add-card">+ Add a goal</div>
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
        </div>
    );
};

export default Dashboard;