import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AddAnnouncment.css'; // Include your CSS file

// const AnnouncementsPage = () => {
//     const [announcements, setAnnouncements] = useState([]);
//     const [isEditing, setIsEditing] = useState(null); // Track which announcement is being edited
//     const [editText, setEditText] = useState(''); // Store edit text
//     const [newAnnouncement, setNewAnnouncement] = useState(''); // Store new announcement text
  
//     useEffect(() => {
//       // Fetch announcements from the backend
//       const fetchAnnouncements = async () => {
//         try {
//           const response = await axios.get('https://your-backend-api.com/announcements');
//           setAnnouncements(response.data);
//         } catch (error) {
//           console.error('Error fetching announcements:', error);
//         }
//       };
  
//       fetchAnnouncements();
//     }, []);
  
//     const handleEdit = (id) => {
//       setIsEditing(id);
//       const announcement = announcements.find((announcement) => announcement.id === id);
//       setEditText(announcement.title);
//     };
  
//     const handleEditChange = (e) => {
//       setEditText(e.target.value);
//     };
  
//     const handleEditSubmit = async (id) => {
//       try {
//         const response = await axios.put(`https://your-backend-api.com/announcements/${id}`, {
//           title: editText,
//         });
//         if (response.status === 200) {
//           setAnnouncements((prev) =>
//             prev.map((announcement) => (announcement.id === id ? { ...announcement, title: editText } : announcement))
//           );
//           setIsEditing(null);
//           setEditText('');
//         }
//       } catch (error) {
//         console.error('Error editing announcement:', error);
//       }
//     };
  
//     const handleCopy = async (id) => {
//       try {
//         const announcement = announcements.find((announcement) => announcement.id === id);
//         const response = await axios.post('https://your-backend-api.com/announcements', {
//           title: `${announcement.title} (copy)`,
//           postedAt: new Date().toISOString(),
//           viewers: 0,
//         });
//         if (response.status === 201) {
//           setAnnouncements([...announcements, response.data]);
//         }
//       } catch (error) {
//         console.error('Error copying announcement:', error);
//       }
//     };
  
//     const handleDelete = async (id) => {
//       try {
//         const response = await axios.delete(`https://your-backend-api.com/announcements/${id}`);
//         if (response.status === 200) {
//           setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
//         }
//       } catch (error) {
//         console.error('Error deleting announcement:', error);
//       }
//     };
  
//     const handleAddAnnouncement = async () => {
//       try {
//         const response = await axios.post('https://your-backend-api.com/announcements', {
//           title: newAnnouncement,
//           postedAt: new Date().toISOString(),
//           viewers: 0,
//         });
//         if (response.status === 201) {
//           setAnnouncements((prev) => [...prev, response.data]);
//           setNewAnnouncement('');
//         }
//       } catch (error) {
//         console.error('Error adding announcement:', error);
//       }
//     };
  
//     return (
//       <div className="announcements-container">
//         <h1>Announcements</h1>
//         <div className="add-announcement">
//           <input
//             type="text"
//             placeholder="New announcement"
//             value={newAnnouncement}
//             onChange={(e) => setNewAnnouncement(e.target.value)}
//           />
//           <button onClick={handleAddAnnouncement}>Add Announcement</button>
//         </div>
//         <table className="announcements-table">
//           <thead>
//             <tr>
//               <th>Announcement</th>
//               <th>Status</th>
//               <th>Viewers</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {announcements.map((announcement) => (
//               <tr key={announcement.id}>
//                 <td>
//                   {isEditing === announcement.id ? (
//                     <input type="text" value={editText} onChange={handleEditChange} />
//                   ) : (
//                     announcement.title
//                   )}
//                 </td>
//                 <td>Posted {new Date(announcement.postedAt).toLocaleString()}</td>
//                 <td>{announcement.viewers}</td>
//                 <td>
//                   {isEditing === announcement.id ? (
//                     <button onClick={() => handleEditSubmit(announcement.id)}>Save</button>
//                   ) : (
//                     <>
//                       <button onClick={() => handleEdit(announcement.id)}>Edit</button>
//                       <button onClick={() => handleCopy(announcement.id)}>Copy</button>
//                       <button onClick={() => handleDelete(announcement.id)}>Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };
  
//   export default AnnouncementsPage;



 // Include your CSS file

 
 
 
 
 const AnnouncementsPage = () => {
   const [announcements, setAnnouncements] = useState([]);
   const [isEditing, setIsEditing] = useState(null);
   const [editTitle, setEditTitle] = useState('');
   const [editMessage, setEditMessage] = useState('');
   const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '' });
   const [modalIsOpen, setModalIsOpen] = useState(false);
 
   // Function to handle edit initiation
   const handleEdit = (id, title, message) => {
     setIsEditing(id);
     setEditTitle(title);
     setEditMessage(message);
   };
 
   // Function to handle title edit changes
   const handleEditTitleChange = (e) => {
     setEditTitle(e.target.value);
   };
 
   // Function to handle message edit changes
   const handleEditMessageChange = (e) => {
     setEditMessage(e.target.value);
   };
 
   // Function to submit edits
   const handleEditSubmit = (id) => {
     setAnnouncements((prev) =>
       prev.map((announcement) =>
         announcement.id === id ? { ...announcement, title: editTitle, message: editMessage } : announcement
       )
     );
     setIsEditing(null);
     setEditTitle('');
     setEditMessage('');
   };
 
   // Function to cancel editing
   const cancelEdit = () => {
     setIsEditing(null);
     setEditTitle('');
     setEditMessage('');
   };
 
   // Function to handle adding a new announcement
   const handleAddAnnouncement = () => {
     if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
       console.error('Announcement title or message is empty');
       return;
     }
 
     setAnnouncements((prev) => [
       ...prev,
       {
         id: prev.length + 1,
         title: newAnnouncement.title,
         message: newAnnouncement.message,
         postedAt: new Date().toISOString(),
         viewers: 0,
       },
     ]);
     setNewAnnouncement({ title: '', message: '' });
     setModalIsOpen(false);
   };
 
   // Function to handle deleting an announcement
   const handleDelete = (id) => {
     setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
   };
 
   // Function to handle copying an announcement
   const handleCopy = (id, title, message) => {
     setAnnouncements((prev) => [
       ...prev,
       {
         id: prev.length + 1,
         title: `${title} (copy)`,
         message: message,
         postedAt: new Date().toISOString(),
         viewers: 0,
       },
     ]);
   };
 
   // Function to open modal
   const openModal = () => {
     setModalIsOpen(true);
   };
 
   // Function to close modal
   const closeModal = () => {
     setModalIsOpen(false);
   };
 
   // Function to send announcements to backend
   const sendAnnouncementsToBackend = async () => {
     try {
       const response = await fetch('http://your-backend-api-url/announcements', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(announcements),
       });
 
       if (!response.ok) {
         throw new Error('Failed to send announcements to the backend.');
       }
 
       console.log('Announcements sent to backend successfully.');
     } catch (error) {
       console.error('Error sending announcements to backend:', error.message);
     }
   };
 
   // useEffect to send announcements whenever announcements state changes
   useEffect(() => {
     if (announcements.length > 0) {
       sendAnnouncementsToBackend();
       alert('sendAnnouncementsToBackend...........');

     }
   }, [announcements]);
 
   return (
     <div className="announcements-container">
       <h1>Announcements</h1>
       
 
       {/* Modal for adding new announcement */}
       <Modal
         isOpen={modalIsOpen}
         onRequestClose={closeModal}
         contentLabel="Add Announcement"
         className="modal"
         overlayClassName="overlay"
       >
         <form>
           <h2>New Announcement</h2>
           <div className="form-group">
             <label htmlFor="title">Title</label>
             <input
               type="text"
               id="title"
               value={newAnnouncement.title}
               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
             />
           </div>
           <div className="form-group">
             <label htmlFor="message">Message</label>
             <textarea
               id="message"
               value={newAnnouncement.message}
               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
             ></textarea>
           </div>
           <button type="button" onClick={handleAddAnnouncement}>
             Save
           </button>
           <button type="button" onClick={closeModal}>
             Cancel
           </button>
         </form>
       </Modal>
 
       {/* Table of announcements */}
       <table className="announcements-table">
         <thead>
           <tr>
             <th>Announcement</th>
             <th>Posted At</th>
             <th>Viewers</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {announcements.map((announcement) => (
             <tr key={announcement.id}>
               <td>
                 {isEditing === announcement.id ? (
                   <div>
                     <h3>Title:</h3>
                     <input type="text" value={editTitle} onChange={handleEditTitleChange} />
                     <h3>Message:</h3>
                     <textarea value={editMessage} onChange={handleEditMessageChange}></textarea>
                   </div>
                 ) : (
                   <div>
                     <div>
                       <h3>Title:</h3>
                       {announcement.title}
                     </div>
                     <div>
                       <h3>Message:</h3>
                       {announcement.message}
                     </div>
                   </div>
                 )}
               </td>
               <td>Posted {new Date(announcement.postedAt).toLocaleString()}</td>
               <td>{announcement.viewers}</td>
               <td>
                 {isEditing === announcement.id ? (
                   <>
                     <button onClick={() => handleEditSubmit(announcement.id)}>Save</button>
                     <button onClick={cancelEdit}>Cancel</button>
                   </>
                 ) : (
                   <>
                     <button className="action" onClick={() => handleEdit(announcement.id, announcement.title, announcement.message)}>
                       Edit
                     </button>
                     <button className="action" onClick={() => handleCopy(announcement.id, announcement.title, announcement.message)}>
                       Copy
                     </button>
                     <button className="action" onClick={() => handleDelete(announcement.id)}>
                       Delete
                     </button>
                   </>
                 )}
               </td>
             </tr>
           ))}
         </tbody>
       </table>
       <button onClick={openModal}>Add Announcement</button>
     </div>
   );
 };
 
 export default AnnouncementsPage;
 