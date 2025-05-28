import React, { useState } from 'react'
import supabase from '../helper/supabaseClient';
import Settingwindow from './Settingwindow.jsx';

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