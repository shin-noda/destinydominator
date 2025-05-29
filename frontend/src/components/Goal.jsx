import { useNavigate } from "react-router-dom";
import Edit from "./Edit.jsx";

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
            <Edit />
            {goalText}
        </div>
    );
};

export default Goal;