import { forwardRef } from "react";

const Goalnode = forwardRef(({ name, isAchieved }, ref) => {
    const getBackgroundColor = () => {
        if (isAchieved) {
            return "lightgreen";
        }

        return "#F3E5AB";
    };

    return (
        <div
            className="goal-node"
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

export default Goalnode;