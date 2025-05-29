import { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { Navigate } from "react-router-dom";

function Wrapper({children}) {
    // The default value is false since we don't know if the user is authenticated yet.
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // It only runs once since it uses []
    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // This !! converts !!null to false.
            // But if we have !!{}, it's gonna be true.
            setAuthenticated(!!session);
            setLoading(false);
        };

        getSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        if (authenticated) {
            return <>{children}</>;
        }

        // Not authenticated
        return <Navigate to="/login" />;
    }
};

export default Wrapper;