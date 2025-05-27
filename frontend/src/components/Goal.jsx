import React from 'react'

const Goal = ({ goalText }) => {
    function handleEditGoal() {
        console.log("Goal Clicked");
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