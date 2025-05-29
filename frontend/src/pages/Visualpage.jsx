import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import supabase from '../helper/supabaseClient';
import Navigationbar from '../components/Navigationbar';
import Goalnode from '../components/Goalnode';
import Tasknode from '../components/Tasknode';
import Actionnode from '../components/Actionnode';
import Nodeline from '../components/Nodeline';

const Visualpage = () => {
    const [goal, setGoal] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [actions, setActions] = useState([]);
    const goalRef = useRef(null);
    const taskRefs = useRef({});
    const actionRefs = useRef({});

    // Those for storing coordinate data for nodes
    const goalCoords = useRef([]);
    const taskCoords = useRef({});
    const actionCoords = useRef({});

    // This is for drawing lines
    const lines = useRef([]);

    // This is for resizing
    const [, forceUpdate] = useState(0);

    // id is a string
    const { id } = useParams();

    // converted it to an int
    const goalId = parseInt(id);

    // Load the goal once on start
    useEffect(() => {
        fetchData();
    }, []);

    // Use refs forwarded from the children refs
    useEffect(() => {
        calculateCoordinates();
        drawLinesBetweenNodes();
    }, [goal, tasks, actions]);

    useEffect(() => {
        const handleWindowResize = () => {
            calculateCoordinates();
            drawLinesBetweenNodes();
        };

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const calculateCoordinates = () => {
        // For Goalnode
        if (goalRef.current) {
            const rect = goalRef.current.getBoundingClientRect();

            // Note: it is NOT const x = (rect.left + rect.width) / 2
            const x = rect.left + (rect.width / 2);
            const y = rect.top + (rect.height / 2);

            goalCoords.current = [{ x, y }];
        }

        // For Tasknodes
        for (const id in taskRefs.current) {
            const { el, taskId } = taskRefs.current[id];

            if (el) {
                const rect = el.getBoundingClientRect();

                const x = rect.left + (rect.width / 2);
                const y = rect.top + (rect.height / 2);

                taskCoords.current[id] = { taskId, x, y };
            }
        }

        // For Actionnodes
        for (const id in actionRefs.current) {
            const { el, taskId } = actionRefs.current[id];

            if (el) {
                const rect = el.getBoundingClientRect();

                const x = rect.left + (rect.width / 2);
                const y = rect.top + (rect.height / 2);

                actionCoords.current[id] = { taskId, x, y };
            }
        }

    };

    // Fetch data based on the id.
    const fetchData = async () => {
        await fetchOneGoal();
        const taskIds = await fetchTasks();
        await fetchActions(taskIds);
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

        let taskIds = [];

        for (let i = 0; i < data.length; i++) {
            taskIds.push(data[i].id);
        }

        // set data
        setTasks(data.map(item => ({ id: item.id, taskText: item.name })));

        // this is requiered because even though tasks are set, those changes won't be instant
        return taskIds;
    };

    const fetchActions = async (taskIds) => {
        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Action')
            .select('*')
            .in('task_id', taskIds)
            .order('id');
        
        // set data
        setActions(data.map(item => ({ id: item.id, actionText: item.name, taskId: item.task_id })));
    };
    
    const drawLinesBetweenNodes = () => {
        const newLines = [];

        // Draw lines from the goal to tasks
        for (const key in taskCoords.current) {
            const { taskId, x, y } = taskCoords.current[key];

            newLines.push({
                from: { x: goalCoords.current[0].x, y: goalCoords.current[0].y },
                to: { x: x, y: y}
            });
        }

        // Draw lines from tasks to actions
        for (const keyTask in taskCoords.current) {
            for (const keyAction in actionCoords.current) {
                const { taskId: taskTaskId, x: taskX, y: taskY } = taskCoords.current[keyTask];
                const { taskId: actionTaskId, x: actionX, y: actionY } = actionCoords.current[keyAction];

                // Check if they have the same taskId
                if (taskTaskId === actionTaskId) {
                    newLines.push({
                        from: { x: taskX, y: taskY },
                        to: { x: actionX, y: actionY }
                    });
                }
            }
        }

        lines.current = newLines;

        // Need this for constantly rendering lines
        forceUpdate(prev => prev + 1);
    };

    return (
        <div>
            <Navigationbar />
            <Nodeline lines={lines.current} />
            <div
                className="visual-page-container"
            >
                <div
                    className="goal-area"
                >
                    <Goalnode
                        name={goal.goalText}
                        ref={goalRef}
                    />
                </div>
                <div
                    className="task-area"
                >
                    {tasks.map((task) => (
                        <Tasknode 
                            key={task.id}
                            taskId={task.id}
                            name={task.taskText}
                            ref={(el) => {
                                if (el) {
                                    taskRefs.current[task.id] = {
                                        el,
                                        taskId: task.id
                                    };
                                }
                            }}
                        />
                    ))}
                </div>
                <div
                    className="action-area"
                >
                    {actions.map((action) => (
                        <Actionnode 
                            key={action.id}
                            taskId={action.id}
                            name={action.actionText}
                            ref={(el) => {
                                if (el) {
                                    actionRefs.current[action.id] = {
                                        el,
                                        taskId: action.taskId
                                    };
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Visualpage;