import { useState } from 'react'
import supabase from '../helper/supabaseClient';
import Edit from "./Edit.jsx";

const Action = ({ id, actionText, isAchieved, onDelete }) => {
    const [text, setText] = useState(actionText);
    const [isHovered, setIsHovered] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [is_achieved, setIs_achieved] = useState(isAchieved);

    const handleEditClick = (e) => {
        setIsEditing(true);
    };

    const handleUpdateAction = async (e) => {
        setIsEditing(false);

        // If the user didn't type anything, it just closes the box.
        if (text && text.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Action')
                .update({ name: text })
                .eq('id', id);
            
            // Update the page when it's saved
            if (error) {
                console.error("Error updating action: ", error);
            }
        } else {
            // Cancel update
            setText(actionText)
        }
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleDeleteAction = async (e) => {
        e.stopPropagation();
        setIsEditing(false);

        // Delete the action
        const { data, error } = await supabase
            .from('Action')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error("Error deleting action: ", error);
        } else {
            // Notify parent to remove from UI
            onDelete(id);
        }
    };

    const handleCancelAction = (e) => {
        // This stops calling the parent element.
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
            .from('Action')
            .update({ is_achieved: !is_achieved })
            .eq('id', id);

        
        setIs_achieved(!is_achieved);
    }

    return (
        <div
            className="action-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ backgroundColor: getBackgroundColor() }}
        >
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
                    <textarea
                        className="action-field"
                        value={text}
                        onChange={handleInputChange}
                        placeholder="Type your action"
                        maxLength="200"
                    />
                    <br></br>
                    <button
                        className="save-button"
                        onClick={handleUpdateAction}
                    >
                        Save
                    </button>
                    <button
                        className="delete-button"
                        onClick={handleDeleteAction}
                    >
                        Delete
                    </button>
                    <button
                        className="cancel-button"
                        onClick={handleCancelAction}
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

export default Action;