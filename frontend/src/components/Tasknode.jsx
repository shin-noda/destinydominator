import { forwardRef } from "react";

const Tasknode = forwardRef(({ taskId, name }, ref) => {
    return (
        <div
            className="task-node"
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