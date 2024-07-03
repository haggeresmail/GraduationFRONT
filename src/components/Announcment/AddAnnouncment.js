import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AddAnnouncment.css'; // Include your CSS file

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [editInstructorName, setEditInstructorName] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ text: '', instructorId: 0, courseId: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(false); // State to control displaying the table

  // Function to handle edit initiation
  const handleEdit = (id, text, instructorName) => {
    setIsEditing(id);
    setEditText(text);
    setEditInstructorName(instructorName);
  };

  // Function to handle text edit changes
  const handleEditTextChange = (e) => {
    setEditText(e.target.value);
  };

  // Function to handle instructor name edit changes
  const handleEditInstructorNameChange = (e) => {
    setEditInstructorName(e.target.value);
  };

  // Function to submit edits
  const handleEditSubmit = async (id) => {
    try {
      const response = await axios.put(`http://learnhub.runasp.net/api/Announcement`, {
        text: editText,
        instructorName: editInstructorName,
        
      });
      if (response.status === 200) {
        setAnnouncements((prev) =>
          prev.map((announcement) =>
            announcement.id === id ? { ...announcement, text: editText, instructorName: editInstructorName } : announcement
          )
        );
        setIsEditing(null);
        setEditText('');
        setEditInstructorName('');
      }
    } catch (error) {
      console.error('Error editing announcement:', error);
    }
  };

  // Function to handle adding a new announcement
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.text.trim() || !newAnnouncement.courseId.trim()) {
      console.error('Announcement text or courseId is empty');
      return;
    }

    try {
      const response = await axios.post('http://learnhub.runasp.net/api/Announcement', {
        text: newAnnouncement.text,
        instructorId: newAnnouncement.instructorId,
        courseId: newAnnouncement.courseId,
      });

      if (response.status === 201) {
        const newAnnouncementData = {
          id: response.data.id,
          text: response.data.text,
          instructorId: response.data.instructorId,
          courseId: response.data.courseId,
          postedAt: response.data.postedAt,
        };

        setAnnouncements((prev) => [...prev, newAnnouncementData]);
        setNewAnnouncement({ text: '', instructorId: 0, courseId: '' });
        setModalIsOpen(false);
        setShowTable(true); // Show the table after adding the announcement
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  // Function to handle deleting an announcement
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://your-backend-api.com/announcements/${id}`);
      if (response.status === 200) {
        setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  // Function to open modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Function to fetch announcements and show the table
  const handleShowTable = async () => {
    try {
      const response = await axios.get('http://learnhub.runasp.net/api/Announcement/is1');
      setAnnouncements(response.data); // Set fetched announcements directly
      setShowTable(true); // Show the table after fetching announcements
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div className="announcements-container">
      <h1>Announcements</h1>
      <button onClick={openModal}>Add Announcement</button>

      {/* Button to show table */}
      <button onClick={handleShowTable}>Show Announcements</button>

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
            <label htmlFor="text">Text</label>
            <input
              type="text"
              id="text"
              value={newAnnouncement.text}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, text: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructorId">Instructor ID</label>
            <input
              type="number"
              id="instructorId"
              value={newAnnouncement.instructorId}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, instructorId: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseId">Course ID</label>
            <input
              type="text"
              id="courseId"
              value={newAnnouncement.courseId}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, courseId: e.target.value })}
            />
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
      {showTable && (
        <table className="announcements-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Text</th>
              <th>Instructor Name</th>
              <th>Date of Announcement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.id}</td>
                <td>
                  {isEditing === announcement.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditTextChange}
                      placeholder="Enter text..."
                    />
                  ) : (
                    announcement.text
                  )}
                </td>
                <td>
                  {isEditing === announcement.id ? (
                    <input
                      type="text"
                      value={editInstructorName}
                      onChange={handleEditInstructorNameChange}
                      placeholder="Enter instructor name..."
                    />
                  ) : (
                    announcement.instructorName
                  )}
                </td>
                <td>{new Date(announcement.dateOfAnnouncement).toLocaleString()}</td>
                <td>
                  {isEditing === announcement.id ? (
                    <>
                      <button className="action" onClick={() => handleEditSubmit(announcement.id)}>
                        Save
                      </button>
                      <button className="action" onClick={() => setIsEditing(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="action" onClick={() => handleEdit(announcement.id, announcement.text, announcement.instructorName)}>
                      Edit
                    </button>
                  )}
                  <button className="action" onClick={() => handleDelete(announcement.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnnouncementsPage;
