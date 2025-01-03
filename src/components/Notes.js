    import React, { useContext, useEffect, useRef, useState } from 'react';
    import noteContext from "../context/notes/noteContext";
    import Noteitem from './Noteitem';
    import AddNote from './AddNote';
    import { useNavigate } from 'react-router-dom';

    const Notes = (props) => {
        const context = useContext(noteContext);
        let navigate = useNavigate();
        const { notes, getNotes, editNote } = context;

        // Fetch notes on component mount
        useEffect(() => {
            if (localStorage.getItem('token')) {
                getNotes(); // This function should update the 'notes' state correctly
            } else {
                navigate("/login");
            }
            // eslint-disable-next-line
        }, [getNotes, navigate]);
        

        const ref = useRef(null);
        const refClose = useRef(null);
        const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

        // Populate the modal with current note data
        const updateNote = (currentNote) => {
            ref.current.click(); // Open modal
            setNote({  
                id: currentNote._id, 
                etitle: currentNote.title, 
                edescription: currentNote.description, 
                etag: currentNote.tag 
            });
        };

        // Handle update submission
        const handleClick = (e) => {
            editNote(note.id, note.etitle, note.edescription, note.etag); // Call context function to edit note
            refClose.current.click(); // Close modal
            props.showAlert("Updated succesfully","success")

        };

        const onChange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value });
        };

        return (
            <>
                {/* Add Note Component */}
                <AddNote showAlert={props.showAlert}/>

                {/*to hide the toggle button*/}
                <button
                    ref={ref}
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Launch demo modal
                </button>

                {/* Modal for editing a note */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            name="etitle"
                                            value={note.etitle}
                                            onChange={onChange}
                                            minLength={5}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="edescription"
                                            name="edescription"
                                            value={note.edescription}
                                            onChange={onChange}
                                            minLength={5}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etag"
                                            name="etag"
                                            value={note.etag}
                                            onChange={onChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    ref={refClose}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    disabled={note.etitle.length < 5 || note.edescription.length < 5}
                                    onClick={handleClick}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display notes */}
                <div className="row my-3">
    <h2>Your Notes</h2>
    <div className="container mx-2">
        {Array.isArray(notes) && notes.length === 0 && 'No notes to display'}
    </div>
    {Array.isArray(notes) && notes.map((note) => (
        <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
    ))}
</div>

            </>
        );
    };

    export default Notes;
