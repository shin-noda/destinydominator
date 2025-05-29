import { useState, useEffect } from 'react';
import supabase from '../helper/supabaseClient';
import Navigationbar from '../components/Navigationbar.jsx';
import Goalblock from '../components/Goalblock.jsx';

const Visualizationpage = () => {
    const [id, setId] = useState(0);
    const [goals, setGoals] = useState([]);

    // Load goals once on start
    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        const userId = await getUserId();

        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Goal')
            .select('*')
            .eq('user_id', userId)
            .order('id');
        
        // set data
        setGoals(data.map(item => ({ id: item.id, goalText: item.name })));
    };

    const getUserId = async () => {
        const email = sessionStorage.getItem('email');

        // Retrieve a user data based on the email
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email);

        setId(parseInt(data[0].id));

        // Looks like this is unnecessary but this is required since setId is not "fast" enough to update the id when it retrieves data in loadGoals
        return parseInt(data[0].id);
    };

    return (
        <div>
            <Navigationbar />
            <h1
                className="top-message"
            >
                Click a goal you want to visualize :)
            </h1>
            <div
                className="visualization-container"
            >
                {goals.map((goal, index) => (
                    <Goalblock
                        key={index} 
                        id={goal.id} 
                        goalText={goal.goalText}
                    />
                ))}
            </div>
        </div>
    );
};

export default Visualizationpage;