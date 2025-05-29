import { forwardRef } from "react";

const Goalnode = forwardRef(({ name }, ref) => {
    return (
        <div
            className="goal-node"
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

export default Goalnode;