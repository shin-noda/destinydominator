import { forwardRef } from "react";

const Tasknode = forwardRef(({ taskId, name, isAchieved }, ref) => {
    const getBackgroundColor = () => {
        if (isAchieved) {
            return "lightgreen";
        }

        return "#A52A2A";
    };

    return (
        <div
            className="task-node"
            style={{ backgroundColor: getBackgroundColor() }}
            ref={ref}
        >
            <div
                className="node-name"
            >
                {name}
            </div>
        </div>
    );
});

export default Tasknode;