import React from "react";
import Setting from './Setting.jsx';
import { useNavigate } from "react-router-dom";

const Navigationbar = () => {
    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate(`/dashboard`);
    };

    const handleClickVisualization = () => {
        navigate(`/visualizationpage`);
    };

    const handleClickAbout = () => {
        navigate(`/about`);
    };
    
    return (
        <div
            className="navigation-container"
        >
            <h1
                className="header-title"
                onClick={handleClickHome}
            >
                Goal Tracker
            </h1>
            <div
                className="home-navigation"
                onClick={handleClickHome}
            >
                Home
            </div>
            <div
                className="visualization-navigation"
                onClick={handleClickVisualization}
            >
                Visualization
            </div>
            <div
                className="about-navigation"
                onClick={handleClickAbout}
            >
                About
            </div>
            <Setting />
        </div>
    );
};
export default Navigationbar;