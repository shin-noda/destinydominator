import React from 'react'

const Goal = ({ id, goalText }) => {
    function handleEditGoal() {
        console.log("id: " + id);
    };

    return (
        <div
            className="goal-container"
            onClick={handleEditGoal}
        >
            {goalText}
        </div>
    );
};

export default Goal;