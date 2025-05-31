import React from "react";
import supabase from '../helper/supabaseClient';
import { useNavigate } from "react-router-dom";

const Settingwindow = () => {
    const navigate = useNavigate();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/");
    };

    return (
        <div
            className="setting-window-container"
        >
            <button
                className="signout-button"
                onClick={signOut}
            >
                log out
            </button>
        </div>
    );
};

export default Settingwindow;