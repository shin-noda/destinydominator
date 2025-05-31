import { useState, useEffect } from 'react';
import supabase from '../helper/supabaseClient';
import Navigationbar from '../components/Navigationbar.jsx';
import Goalblock from '../components/Goalblock.jsx';

const Visualizationpage = () => {
    const [goals, setGoals] = useState([]);

    // Load goals once on start
    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        // Gete data from session
        const user_id = sessionStorage.getItem('user_id');

        // Retrieve all data from the database
        const { data, error } = await supabase
            .from('Goal')
            .select('*')
            .eq('user_id', user_id)
            .order('id');
        
        // set data
        setGoals(data.map(item => ({ id: item.id, goalText: item.name })));
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