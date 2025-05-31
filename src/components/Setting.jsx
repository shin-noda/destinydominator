import React, { useState } from 'react'
import Settingwindow from './Settingwindow.jsx';
import menu from "../assets/menu.svg";

const Setting = () => {
    const [showWindow, setShowWindow] = useState(false);
    const handleClick = () => {
        setShowWindow(!showWindow);
    };

    return (
        <div
            className="setting-container"
            onClick={handleClick}
        >
            <img
                className="menu-bar-image"
                src={menu}
                alt="" />
            {showWindow ? (
                <>
                    <Settingwindow />
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Setting;