import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Task from "../components/Task.jsx";
import Navigationbar from "../components/Navigationbar.jsx";

function Goalpage() {
    const [goal, setGoal] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [showInput, setShowInput] = useState(false);

    // id is a string
    const { id } = useParams();

    // converted it to an int
    const goalId = parseInt(id);

    // This is for invalid ids
    if (isNaN(goalId)) {
        return <div>Invalid ID</div>;
    }

    // Load the goal once on start
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data based on the id.
    const fetchData = async () => {
        fetchOneGoal();
        fetchTasks();
    };

    const fetchOneGoal = async () => {
        const { data, error } = await supabase
            .from('Goal')
            .select('*')
            .eq('id', goalId);
        
        const trimmedGoal = data.map(goal => ({
            id: goal.id,
            goalText: goal.name
        }));
        
        setGoal(...trimmedGoal);
    };

    const fetchTasks = async () => {
        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Task')
            .select('*')
            .eq('goal_id', goalId)
            .order('id');
        
        // set data
        setTasks(data.map(item => ({ id: item.id, taskText: item.name })));
    };

    const handleAddTask = () => {
        setShowInput(true);
    };

    const handleCreateTask = async (e) => {
        e.stopPropagation();
        setShowInput(false);

        // If the user didn't type anything, it just closes the box.
        if (taskText && taskText.trim().length != 0) {
            // Insert data to Supabase
            const { data, error } = await supabase
                .from('Task')
                .insert({ name: taskText, is_achieved: false, goal_id: goalId })
                .select();

            const trimmedTask = data.map(task => ({
                id: task.id,
                taskText: task.name
            }));

            // Display updated a list of tasks
            setTasks([...tasks, ...trimmedTask]);
        }

        setTaskText("");
    }

    const handleInputChange = (e) => {
        setTaskText(e.target.value);
    }

    const handleCancelTask = (e) => {
        // This stops calling the parent element.
        e.stopPropagation();
        setShowInput(false);
        setTaskText("");
    };

    // Need this for updating the screen
    const handleDeleteTask = (idToDelete) => {
        setTasks(prev => prev.filter(task => task.id !== idToDelete));
    };

    return (
        <div>
            <Navigationbar />
            <h1
                className="top-message"
            >
                {goal.goalText}
            </h1>
            <div
                className="goal-page-container"
            >
                <div
                    className="create-task-container"
                    onClick={handleAddTask}
                >
                    {showInput ? (
                        <>
                            <input
                                className="block-input-field"
                                type="text"
                                value={taskText}
                                onChange={handleInputChange}
                                placeholder="Type your task"
                                maxLength="50"
                            />
                            <br></br>
                            <button
                                className="add-button"
                                onClick={handleCreateTask}
                            >
                                Add
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancelTask}
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <div className="add-card">+ Add a task</div>
                    )}
                </div>
                {tasks.map((task) => (
                    <Task
                        key={task.id} 
                        id={task.id} 
                        taskText={task.taskText}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default Goalpage;