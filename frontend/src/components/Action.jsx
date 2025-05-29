import { useState } from 'react'
import supabase from '../helper/supabaseClient';
import Edit from "./Edit.jsx";

const Action = ({ id, actionText, onDelete }) => {
    const [text, setText] = useState(actionText);
    const [isHovered, setIsHovered] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

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

    return (
        <div
            className="action-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
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