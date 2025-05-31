import { useNavigate } from "react-router-dom";

const Goalblock = ({ id, goalText }) => {
    const navigate = useNavigate();

    const handleGoalblockClick = () => {
        navigate(`/visualpage/${id}`);
    };

    return (
        <div
            className="goalblock-container"
            onClick={handleGoalblockClick}
        >
            {goalText}
        </div>
    );
};

export default Goalblock;