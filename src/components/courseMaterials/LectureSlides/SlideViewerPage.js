import React from 'react';
import { useParams } from 'react-router-dom';
import ViewSlides from './ViewSlides'; // Adjust path as per your file structure

const SlideViewerPage = () => {
    // Example: Assuming you retrieve the slides URL from route params or elsewhere
    const { slidesId } = useParams(); // Assuming slidesId is part of your route params

    // Example slide URLs mapping based on slidesId
    const slideUrls = {
        slides1: 'https://www.example.com/slides1.pdf',
        slides2: 'https://www.example.com/slides2.pptx',
        slides3: 'https://www.example.com/slides3.pdf',
        // Add more mappings as needed
    };

    // Default slide URL if slidesId is not found
    const defaultSlideUrl = 'https://www.example.com/slides1.pdf';
    // const defaultSlideUrl = 'https://www.example.com/slides2.pptx';

    // Determine the slide URL based on slidesId, default to defaultSlideUrl if not found
    const slidesUrl = slideUrls[slidesId] || defaultSlideUrl;

    return (
        <div className='slide-viewer-page'>
            <ViewSlides slidesUrl={slidesUrl} />
        </div>
    );
};

export default SlideViewerPage;
