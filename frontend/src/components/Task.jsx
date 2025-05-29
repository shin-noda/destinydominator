import { useNavigate } from "react-router-dom";
import Edit from "./Edit.jsx";

const Task = ({ id, taskText }) => {
    const navigate = useNavigate();

    const handleTaskClick = () => {
        navigate(`/taskpage/${id}`);
    };

    return (
        <div
            className="task-container"
            onClick={handleTaskClick}
        >
            <Edit />
            {taskText}
        </div>
    );
};

export default Task;