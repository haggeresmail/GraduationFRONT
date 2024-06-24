// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// import './RecordedLecture.css';
// // import '../CourseMaterial';

// const RecordedLecture = ({ url }) => {
//     const navigate = useNavigate(); // Use useNavigate hook
//     // const [lectures, setLectures] = useState([]); // State to hold lectures

//     // useEffect(() => {
//     //     // Fetch lectures from backend
//     //     const fetchLectures = async () => {
//     //         try {
//     //             const response = await fetch('/api/lectures'); // Replace with your backend endpoint
//     //             const data = await response.json();
//     //             setLectures(data);
//     //         } catch (error) {
//     //             console.error('Error fetching lectures:', error);
//     //         }
//     //     };

//     //     fetchLectures();
//     // }, []);

//     const handlePlayVideo = () => {
//         // Navigate to another page where the video plays
//         navigate('/play-video');
//         // navigate(`/play-video/${lectureId}`);
//     };

//     return (
//         <div className='recorded-lecture'>
//             <form className="form-container">
//             <h1>Recorded Lecture</h1>
//             <div>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 1
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 2
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 3
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 4
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 5
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 6
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 7
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 8
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 9
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 10
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 11
//                 </button>
//                 <button  type='button' onClick={handlePlayVideo}>
//                     Lecture 12
//                 </button>
//                 </div>
//             </form>
//             {/* <form className="form-container">
//             <h1>Recorded Lecture</h1>
//                 {lectures.map((lecture, index) => (
//                     <button
//                         key={index}
//                         type='button'
//                         onClick={() => handlePlayVideo(lecture.id)}
//                     >
//                         {lecture.title}
//                     </button>
//                 ))}
//             </form> */}
//         </div>
//     );
// };

// export default RecordedLecture;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import './RecordedLecture.css';
// import '../CourseMaterial';

const RecordedLecture = ({ url }) => {
    const navigate = useNavigate(); // Use useNavigate hook

    const handlePlayVideo = (lectureId) => {
        // Navigate to another page where the video plays
        // navigate(`/play-video/${lectureId}`); 
        navigate(`/play-video`); 
    };

    // Assuming lectures or videos are defined with IDs
    const lectures = [
        { id: 'lecture1', title: 'Lecture 1' },
        { id: 'lecture2', title: 'Lecture 2' },
        { id: 'lecture3', title: 'Lecture 3' },
        // Add more lectures as needed
    ];

    return (
        <div className='recorded-lecture'>
            <form className="form-container">
                <h1>Recorded Lecture</h1>
                <div>
                    {lectures.map((lecture) => (
                        <button
                            key={lecture.id}
                            type='button'
                            onClick={() => handlePlayVideo(lecture.id)}
                        >
                            {lecture.title}
                        </button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default RecordedLecture;
