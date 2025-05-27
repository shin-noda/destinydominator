import React, { useState } from 'react'
import supabase from '../helper/supabaseClient';

const Action = ({ id, actionText }) => {
    const [text, setText] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleActionClick = () => {
        setText(actionText);
        setShowInput(true);
    };

    const handleUpdateAction = async (e) => {
        e.stopPropagation();
        setShowInput(false);

        // If the user didn't type anything, it just closes the box.
        if (text && text.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Action')
                .update({ name: text })
                .eq('id', id);
        };

        setText("");
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleCancelAction = (e) => {
        // This stops calling the parent element.
        e.stopPropagation();
        setShowInput(false);
        setText("");
    };

    return (
        <div
            className="action-container"
            onClick={handleActionClick}
        >

            {showInput ? (
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
                        className="add-action-button"
                        onClick={handleUpdateAction}
                    >
                        Save
                    </button>
                    <button
                        className="cancel-action-button"
                        onClick={handleCancelAction}
                    >
                        X
                    </button>
                </>
            ) : (
                <>{actionText}</>
            )}
        </div>
    );
};

export default Action;