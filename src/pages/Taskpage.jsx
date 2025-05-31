import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Action from "../components/Action.jsx";
import Navigationbar from "../components/Navigationbar.jsx";

function Taskpage() {
    const navigate = useNavigate();
    const [goalId, setGoalId] = useState(0);
    const [task, setTask] = useState([]);
    const [actions, setActions] = useState([]);
    const [actionText, setActionText] = useState("");
    const [showInput, setShowInput] = useState(false);

    // Gete data from session
    const user_id = sessionStorage.getItem('user_id');

    // id is a string
    const { id } = useParams();

    // converted it to an int
    const taskId = parseInt(id);

    // This is for invalid ids
    if (isNaN(taskId)) {
        return <div>Invalid ID</div>;
    }

    // Load the goal once on start
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data based on the id.
    const fetchData = async () => {
        await fetchOneTask();
        await fetchActions();
    };

    const fetchOneTask = async () => {
        const { data, error } = await supabase
            .from('Task')
            .select('*')
            .eq('id', taskId);
        
        const trimmedTask = data.map(task => ({
            id: task.id,
            taskText: task.name
        }));

        setGoalId(data[0].goal_id);
        setTask(...trimmedTask);
    };

    const fetchActions = async () => {
        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Action')
            .select('*')
            .eq('task_id', taskId)
            .order('id');
        
        // set data
        setActions(data.map(item => ({ id: item.id, actionText: item.name, isAchieved: item.is_achieved })));
    };

    const handleClickNavigation = () => {
        let id = goalId
        navigate(`/goalpage/${goalId}`);
    }

    const handleAddAction = () => {
        setShowInput(true);
    };

    const handleCreateAction = async (e) => {
        e.stopPropagation();
        setShowInput(false);

        // If the user didn't type anything, it just closes the box.
        if (actionText && actionText.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Action')
                .insert({ 
                    name: actionText,
                    is_achieved: false,
                    task_id: taskId,
                    user_id: user_id
                })
                .select();

            const trimmedAction = data.map(action => ({
                id: action.id,
                actionText: action.name,
                isAchieved: action.is_achieved
            }));

            // Display updated a list of actions
            setActions([...actions, ...trimmedAction]);
        }

        setActionText("");
    }

    const handleInputChange = (e) => {
        setActionText(e.target.value);
    }

    const handleCancelAction = (e) => {
        // This stops calling the parent element.
        e.stopPropagation();
        setShowInput(false);
        setActionText("");
    };

    // Need this to update the page after deletion of the action
    // Without this the update result won't show up on the screen
    // even though it is updated on the database
    const handleDeleteAction = (idToDelete) => {
        setActions(prev => prev.filter(action => action.id !== idToDelete));
    };

    return (
        <div>
            <Navigationbar />
            <h1
                className="top-message"
                onClick={handleClickNavigation}
            >
                {task.taskText}
            </h1>
            <div
                className="task-page-container"
            >
                <div
                    className="create-action-container"
                    onClick={handleAddAction}
                >
                    {showInput ? (
                        <>
                            <textarea
                                className="action-field"
                                value={actionText}
                                onChange={handleInputChange}
                                placeholder="Type your action"
                                maxLength="200"
                            />
                            <br></br>
                            <button
                                className="add-button"
                                onClick={handleCreateAction}
                            >
                                Add
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelAction}
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <div className="add-card">+ Add an action</div>
                    )}
                </div>
                {actions.map((action) => (
                    <Action
                        key={action.id} 
                        id={action.id} 
                        actionText={action.actionText}
                        isAchieved={action.isAchieved}
                        onDelete={handleDeleteAction}
                    />
                ))}
            </div>
        </div>
    );
}

export default Taskpage;