import { forwardRef } from "react";

const Actionnode = forwardRef(({ taskId, name }, ref) => {
    return (
        <div
            className="action-node"
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

export default Actionnode;