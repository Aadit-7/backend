import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        // console.log(res.data);
        fetchNotes();
      });
  }

  function deleteHandler(noteId) {
    // console.log("deleted", noteId);

    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      // console.log("done");
      fetchNotes();
    });
  }

  function updateHandler(noteId) {
    console.log(noteId);

    const newDescription = prompt("Enter new description");

    axios
      .patch("http://localhost:3000/api/notes/" + noteId, {
        description: newDescription,
      })
      .then((res) => {
        // console.log(res.data);
        fetchNotes();
      });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input type="text" name="title" placeholder="Enter title" />
        <input type="text" name="description" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  deleteHandler(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateHandler(note._id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
