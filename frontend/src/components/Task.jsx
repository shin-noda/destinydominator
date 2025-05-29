import { useNavigate } from "react-router-dom";

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
            {taskText}
        </div>
    );
};

export default Task;