const Nodeline = ({ lines }) => {
    return (
        <svg
            className="node-line"
        >
            {lines.map((line, index) => (
                <line
                    key={index}
                    x1={line.from.x}
                    y1={line.from.y}
                    x2={line.to.x}
                    y2={line.to.y}
                    stroke="black"
                    strokeWidth="2"
                />
            ))}
        </svg>
    );
};

export default Nodeline;