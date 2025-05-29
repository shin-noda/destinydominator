import { useNavigate } from "react-router-dom";

const Goal = ({ id, goalText }) => {
    const navigate = useNavigate();

    const handleGoalClick = () => {
        navigate(`/goalpage/${id}`);
    };

    return (
        <div
            className="goal-container"
            onClick={handleGoalClick}
        >
            {goalText}
        </div>
    );
};

export default Goal;