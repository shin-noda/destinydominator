import React from 'react'
import supabase from '../helper/supabaseClient';

const Goal = ({ id, goalText, onDelete }) => {
    const handleDeleteGoal = async () => {
        const { error } = await supabase
            .from('Goal')
            .delete()
            .eq('id', id)
        
        if (!error) {
            // Update state in parent
            onDelete(id);
        }
    };

    return (
        <div
            className="goal-container"
        >
            {goalText}
            <button
                className="delete-goal-button"
                onClick={handleDeleteGoal}
            >
                X
            </button>
        </div>
    );
};

export default Goal;