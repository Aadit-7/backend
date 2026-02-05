import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api1/notes").then((res) => {
      setNotes(res.data.note);
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
      .post("http://localhost:3000/api1/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        // console.log(res);
        fetchNotes();
      });
  }

  function deleteHandler(noteId) {
    console.log(noteId);

    axios.delete("http://localhost:3000/api1/notes/" + noteId).then((res) => {
      // console.log(res);
      fetchNotes();
    });
  }

  function updateHandler(noteId) {
    console.log(noteId);

    const newDescription = prompt("Enter new description");

    axios
      .patch("http://localhost:3000/api1/notes/" + noteId, {
        description: newDescription,
      })
      .then((res) => {
        // console.log(res);
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
        <input type="text" name="description" placeholder="Enter desc" />
        <button>Create note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => (
          <div key={idx} className="note">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <div className="btns">
              <button
                onClick={(noteId) => {
                  deleteHandler(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={(noteId) => {
                  updateHandler(note._id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
