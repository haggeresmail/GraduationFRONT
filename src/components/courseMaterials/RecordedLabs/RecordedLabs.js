import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import './RecordedLabs.css';


const RecordedLabs = ({ url }) => {
    const navigate = useNavigate(); // Use useNavigate hook
    // const [labs, setLabs] = useState([]); // State to hold lectures

    // useEffect(() => {
    //     // Fetch lectures from backend
    //     const fetchLabs = async () => {
    //         try {
    //             const response = await fetch('/api/labs'); // Replace with your backend endpoint
    //             const data = await response.json();
    //             setLectures(data);
    //         } catch (error) {
    //             console.error('Error fetching lectures:', error);
    //         }
    //     };

    //     fetchLabs();
    // }, []);

    const handlePlayVideo = () => {
        // Navigate to another page where the video plays
        navigate('/play-video');
        // navigate(`/play-video/${labId}`);
    };

    const Labs = [
        { id: 'lab1', title: 'lab 1' },
        { id: 'lab2', title: 'lab 2' },
        { id: 'lab3', title: 'lab 3' },
        // Add more lectures as needed
    ];

    return (
        <div className='recorded-lecture'>
            <form className="form-container">
                <h1>Recorded labs</h1>
                <div>
                    {Labs.map((lab) => (
                        <button className='buttonsonother'
                            key={lab.id}
                            type='button'
                            onClick={() => handlePlayVideo(lab.id)}
                        >
                            {lab.title}
                        </button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default RecordedLabs;
