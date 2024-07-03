import React , { useState, useEffect }from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./studentAnnouncment.css";
import { GrAnnounce } from "react-icons/gr";

const announcements = [
  {
    id: 1,
    title: 'Announcement 1',
    description: 'This is the first announcement',
  },
  {
    id: 2,
    title: 'Announcement 2',
    description: 'This is the second announcement',
  },
  // Add more announcements here
];

const AnnouncementCard = ({ announcement }) => {
  return (
   
    <div className="card">
        
      <h2><GrAnnounce />{announcement.title}</h2>
      <p>{announcement.description}</p>
    </div>
    
  );
};

const AnnouncementstudentPage = () => {
    // const [announcements, setAnnouncements] = useState([]);
  
    // useEffect(() => {
    //   const fetchAnnouncements = async () => {
    //     try {
    //       const response = await fetch('/api/announcements');
    //       const data = await response.json();
    //       setAnnouncements(data);
    //     } catch (error) {
    //       console.error('Error fetching announcements:', error);
    //     }
    //   };
  
    //   fetchAnnouncements();
    // }, []);
  
  
        return (
          <div className="announcements-containers">
            <h1>Announcements</h1>
            <DragDropContext onDragEnd={(result) => console.log(result)}>
              <Droppable droppableId="announcements">
                {(provided) => (
                  <ul className="announcements-page" ref={provided.innerRef} {...provided.droppableProps}>
                    {announcements.map((announcement, index) => (
                      <Draggable key={announcement.id} draggableId={announcement.id} index={index}>
                        {(provided) => (
                          <li
                            // className="card" // Added className to style each announcement as a card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <AnnouncementCard announcement={announcement} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        );
      };
      
      export default AnnouncementstudentPage;