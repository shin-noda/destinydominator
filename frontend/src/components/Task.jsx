import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit.jsx";
import supabase from "../helper/supabaseClient.js";

const Task = ({ id, taskText, onDelete }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(taskText);

    const handleAddActions = () => {
        navigate(`/taskpage/${id}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSaveTask = async (e) => {
        setIsEditing(false);

        if (text && text.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Task')
                .update({ name: text })
                .eq('id', id);
            
            // Show an error message
            if (error) {
                console.error("Error updating task: ", error);
            }
        } else {
            // Cancel update
            setText(taskText);
        }
    };

    const handleDeleteTask = async (e) => {
        e.stopPropagation();
        setIsEditing(false);

        // Delete the task and correspoinding actions
        const { data, error } = await supabase
            .from('Task')
            .delete()
            .eq('id', id);
        
        deleteCorrespondingActions(id);

        if (error) {
            console.error("Error deleting task: ", error);
        } else {
            // Notify parent to remove from UI
            onDelete(id);
        }
    }

    const deleteCorrespondingActions = async (id) => {
        const { data, error } = await supabase
            .from('Action')
            .delete()
            .eq('task_id', id);
    };

    const handleCancelTask = (e) => {
        e.stopPropagation();
        setIsEditing(false);
    }

    return (
        <div
            className="task-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && !isEditing && (
                <button
                    className="add-actions-button"
                    onClick={handleAddActions}
                >
                    Add actions
                </button>
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
                        onClick={handleSaveTask}
                    >
                        Save
                    </button>
                    <button
                        className="delete-button"
                        onClick={handleDeleteTask}
                    >
                        Delete
                    </button>
                    <button
                        className="cancel-button"
                        onClick={handleCancelTask}
                    >
                        X
                    </button>
                </>
            ): (
                <span>{text}</span>
            )}
        </div>
    );
};

export default Task;