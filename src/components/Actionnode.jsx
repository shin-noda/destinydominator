import { forwardRef } from "react";

const Actionnode = forwardRef(({ taskId, name, isAchieved }, ref) => {
    const getBackgroundColor = () => {
        if (isAchieved) {
            return "lightgreen";
        }

        return "#87CEFA";
    };

    return (
        <div
            className="action-node"
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

export default Actionnode;