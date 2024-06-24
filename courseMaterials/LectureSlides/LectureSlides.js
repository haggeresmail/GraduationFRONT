import React from 'react';
import { useNavigate } from 'react-router-dom';

const LectureSlides = () => {
    const navigate = useNavigate();

    // Assuming slides or presentations are defined with IDs
    const slides = [
        { id: 'slides1', title: 'Slides 1' },
        { id: 'slides2', title: 'Slides 2' },
        { id: 'slides3', title: 'Slides 3' },
        // Add more slides as needed
    ];

    const handleViewSlides = (slidesId) => {
        // Navigate to another page where the slides are viewed
        // navigate(`/view-slides/${slidesId}`);
        navigate(`/view-slides`); // For demonstration, navigate to a general slides view
    };

    return (
        <div className='lecture-slides'>
            <form className="form-container">
                <h1>Lecture Slides</h1>
                <div>
                    {slides.map((slides) => (
                        <button
                            key={slides.id}
                            type='button'
                            onClick={() => handleViewSlides(slides.id)}
                        >
                            {slides.title}
                        </button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default LectureSlides;
