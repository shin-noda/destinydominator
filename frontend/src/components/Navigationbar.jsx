import React, { useState } from 'react'
import supabase from '../helper/supabaseClient';
import Setting from './Setting.jsx';

const Navigationbar = () => {
    return (
        <div
            className="navigation-container"
        >
            <h1
                className="header-title"
            >
                Goal Tracker
            </h1>
            <div
                className="home-navigation"
            >
                Home
            </div>
            <div
                className="visualization-navigation"
            >
                Visualization
            </div>
            <div
                className="about-navigation"
            >
                About
            </div>
            <Setting />
        </div>
    );
};
export default Navigationbar;