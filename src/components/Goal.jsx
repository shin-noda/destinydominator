import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit.jsx";
import supabase from "../helper/supabaseClient.js";

const Goal = ({ id, goalText, isAchieved, onDelete }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [is_achieved, setIs_achieved] = useState(isAchieved);
    const [text, setText] = useState(goalText);

    const handleAddTasks = () => {
        navigate(`/goalpage/${id}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleSaveGoal = async (e) => {
        setIsEditing(false);

        if (text && text.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Goal')
                .update({ name: text })
                .eq('id', id);
            
            // Show an error message
            if (error) {
                console.error("Error updating goal: ", error);
            }
        } else {
            // Cancel update
            setText(goalText);
        }
    };

    const handleDeleteGoal = async (e) => {
        e.stopPropagation();
        setIsEditing(false);

        deleteCorrespoindingTasksAndActions(id);

        // Delete the goal and corresponding tasks and actions
        // Note: need to delete this after deleting corresponding tasks and actions
        const { data, error } = await supabase
            .from('Goal')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error("Error deleting goal: ", error);
        } else {
            // Notify parent to remove from UI
            onDelete(id);
        }
    };

    const deleteCorrespoindingTasksAndActions = async (id) => {
        const { data: taskData, error: taskError } = await supabase
            .from('Task')
            .select('*')
            .eq('goal_id', id);

        // Delete actions related to the task
        for (let i = 0; i < taskData.length; i++) {
            const taskId = taskData[i].id;

            // Delete actions
            const { data: actionData, error: actionError } = await supabase
                .from('Action')
                .delete()
                .eq('task_id', taskId);
            
            // Delete the task
            const { data: oneTask, error: oneTaskError } = await supabase
                .from('Task')
                .delete()
                .eq('id', taskId);
        }
    };

    const handleCancelGoal = (e) => {
        e.stopPropagation();
        setIsEditing(false);
    };

    const getBackgroundColor = () => {
        if (is_achieved) {
            return "lightgreen";
        }

        return "white";
    };

    const handleCheckboxChange = async() => {
        // Update the state of the goal
        const { data, error } = await supabase
            .from('Goal')
            .update({ is_achieved: !is_achieved })
            .eq('id', id);

        
        setIs_achieved(!is_achieved);
    }

    return (
        <div
            className="goal-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            {isHovered && !isEditing && (
                <button
                    className="add-tasks-button"
                    onClick={handleAddTasks}
                >
                    Add tasks
                </button>
            )}

            {isHovered && !isEditing && (
                <div
                    className="done-container"
                >
                    <input
                        className="done-checkbox"
                        type="checkbox"
                        checked={is_achieved}
                        onChange={handleCheckboxChange}
                    />
                    Done
                </div>
            )}


            {isHovered && !isEditing && (
                <Edit onClick={handleEditClick} />
            )}

            {isEditing ? (
                <>
                    <input 
                        className="block-input-field"
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                    />
                    <br></br>
                    <button
                        className="add-button"
                        onClick={handleSaveGoal}
                    >
                        Save
                    </button>
                    <button
                        className="delete-button"
                        onClick={handleDeleteGoal}
                    >
                        Delete
                    </button>
                    <button
                        className="cancel-button"
                        onClick={handleCancelGoal}
                    >
                        X
                    </button>
                </>
            ) : (
                <span>{text}</span>
            )}
        </div>
    );
};

export default Goal;