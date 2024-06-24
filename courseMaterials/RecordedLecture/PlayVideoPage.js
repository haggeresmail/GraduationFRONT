// import React from 'react';
// import ReactPlayer from 'react-player';

// const PlayVideoPage = () => {
    
//     const videoUrl = 'https://www.example.com/lecture.mp4';

//     return (
//         <div className='play-video-page'>
//             <h1>Playing Video</h1>
//             <ReactPlayer
//                 url={videoUrl}
//                 controls={true}
//                 width='50%'
//                 height='50%'
//             />
//         </div>
//     );
// };
// export default PlayVideoPage;
import React from 'react';
import ReactPlayer from 'react-player';

const PlayVideoPage = ({ lectureId }) => {
    // Example video URLs mapping based on lectureId
    const videoUrls = {
        lecture1: 'https://www.example.com/lecture2.mp4',
        lecture2: 'https://www.example.com/lecture2.mp4',
        lecture3: 'https://www.example.com/lecture3.mp4',
        // Add more mappings as needed
    };

    // Default video URL if lectureId is not found
    const defaultVideoUrl = 'https://www.example.com/default.mp4';

    // Determine the video URL based on lectureId, default to defaultVideoUrl if not found
    const videoUrl = videoUrls[lectureId] || defaultVideoUrl;

    return (
        <div className='play-video-page'>
            <h1>Playing Video</h1>
            <ReactPlayer
                url={videoUrl}
                controls={true}
                width='50%'
                height='50%'
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 }
                    }
                }}
                playing={true}
            />
        </div>
    );
};

export default PlayVideoPage;
