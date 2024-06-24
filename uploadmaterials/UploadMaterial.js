import React, { useState } from 'react';

import axios from 'axios';
import "./uplaodmaterials.css";

const UploadMaterial = ({ courseId }) => {
  const [file, setFile] = useState(null);
  const [materialType, setMaterialType] = useState('Recorded Lecture');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSecondaryForm, setShowSecondaryForm] = useState(false);
  const [lastUploadedFile, setLastUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTypeChange = (event) => {
    setMaterialType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: materialType,
        file: URL.createObjectURL(file), // Create a local URL for the uploaded file
      };
      setLastUploadedFile(newFile);
      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
      setShowSecondaryForm(true);
      setFile(null); // Reset the file input
    }
  };

  const handleDelete = (fileId) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    if (lastUploadedFile && lastUploadedFile.id === fileId) {
      setShowSecondaryForm(false);
      setLastUploadedFile(null);
    }
  };
  const handleSecondarySubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('material', file); // The file to be uploaded
    formData.append('type', materialType);
    formData.append('courseId', courseId);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File sent to backend:', response.data);
      // Handle successful submission to backend (e.g., show a success message)
    } catch (error) {
      console.error('Error sending file to backend:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Upload Material</h2>
        <div>
          <label>Material Type:</label>
          <select value={materialType} onChange={handleTypeChange}>
            <option value="Recorded Lecture">Recorded Lecture</option>
            <option value="Recorded Lab">Recorded Lab</option>
            <option value="Lecture Slides">Lecture Slides</option>
            <option value="Lab Slides">Lab Slides</option>
          </select>
        </div>
        <div className="file-input-wrapper">
          <span>Choose File</span>
          <input type="file" onChange={handleFileChange} />
          {file && <span className="file-input-label">{file.name}</span>}
        </div>
        <button  className="submit" type="submit">Upload</button>
      </form>

      {showSecondaryForm && lastUploadedFile && (
        <div>
          
          <form onSubmit={handleSecondarySubmit}>
          <h3>Last Uploaded File</h3>
          <div>
            <label>File Name:</label>
            <span>{lastUploadedFile.name}</span>
          </div>
          <div>
            <label>Material Type:</label>
            <span>{lastUploadedFile.type}</span>
          </div>
          <button type="button" onClick={() => handleDelete(lastUploadedFile.id)}>Delete</button>
          <button type="submit">Send to Backend</button>
        </form>
        </div>
      )}
<form>
      <h3>Uploaded Files</h3>
      <ul>
        {uploadedFiles.map((file) => (
            
          <li key={file.id}>
            <label>File Name:</label>
            <a href={file.file} target="_blank" rel="noopener noreferrer">
              {file.name} 
              {/* ({file.type}) */}
            </a>
            <label>Material Type:</label>
            {/* <a href={file.file} target="_blank" rel="noopener noreferrer"> */}
              {/* {file.name}  */}
              {file.type}
            {/* </a> */}
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </form>
    </div>
  );
};

export default UploadMaterial;
