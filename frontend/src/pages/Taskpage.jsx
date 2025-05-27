import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Action from "../components/Action.jsx";

function Taskpage() {
    const [task, setTask] = useState([]);
    const [actions, setActions] = useState([]);
    const [actionText, setActionText] = useState("");
    const [showInput, setShowInput] = useState(false);

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
        
        setTask(...trimmedTask);
    };

    const fetchActions = async () => {
        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Action')
            .select('*')
            .eq('task_id', taskId);
        
        // set data
        setActions(data.map(item => ({ id: item.id, actionText: item.name })));
    };

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
                .insert({ name: actionText, is_achieved: false, task_id: taskId })
                .select();

            const trimmedAction = data.map(action => ({
                id: action.id,
                actionText: action.name
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

    return (
        <div>
            <h1>{task.taskText}</h1>
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
                                className="add-action-button"
                                onClick={handleCreateAction}
                            >
                                Add
                            </button>
                            <button
                                className="cancel-action-button"
                                onClick={handleCancelAction}
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <>+ Add an action</>
                    )}
                </div>
                {actions.map((action, index) => (
                    <Action
                        key={index} 
                        id={action.id} 
                        actionText={action.actionText}
                    />
                ))}
            </div>
        </div>
    );
}

export default Taskpage;