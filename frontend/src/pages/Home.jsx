import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            className="home-container"
        >
            <Link to="/register">Reister</Link>
            <br></br>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default Home;