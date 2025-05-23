import React from 'react'

const Goal = () => {
    function handleEditGoal() {
        console.log("Goal Clicked");
    };

    return (
        <div
            className="goal-container"
            onClick={handleEditGoal}
        >
            goal
        </div>
    );
};

export default Goal;