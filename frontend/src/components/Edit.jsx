import { useState } from 'react'
import pen from "../assets/pen.svg";

const Edit = () => {
    const [showWindow, setShowWindow] = useState(false);
    const handleClick = () => {
        setShowWindow(!showWindow);
    };

    return (
        <div>
            {showWindow ? (
            <img
                className="edit-pen-image"
                src={pen}
                alt=""
                onClick={handleClick}
            />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Edit;