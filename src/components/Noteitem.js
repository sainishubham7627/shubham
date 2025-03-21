import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items.center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
              style={{ color: " dark rgb(94, 63, 45)" }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
              style={{ color: " dark rgb(94, 63, 45)" }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          {note.file && (
            <a
              href={`http://localhost:3000/${note.file}`}
              className="btn btn-primary mt-2 my-2"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "white",
                backgroundColor: "  rgb(94, 63, 45)",
                borderRadius: "30000px",
              }}
            ></a>
          )}
          <br></br>
          {note.file && (
            <>
              {note.file.match(/\.(jpeg|jpg|gif|png)$/) && (
                <>
                  <img
                    src={`http://localhost:3000/${note.file}`}
                    alt="Uploaded"
                    style={{ width: "100%", maxHeight: "100%" }}
                  />
                  <a
                    href={`http://localhost:3000/${note.file}`}
                    download
                    className="btn btn-primary mt-2 my-2"
                    style={{
                      color: "white",
                      backgroundColor: " rgb(94, 63, 45)",
                      borderRadius: "30000000px",
                    }}
                  >
                    Download Image
                  </a>
                </>
              )}
              {note.file.match(/\.(mp4|webm|ogg)$/) && (
                <>
                  <video controls style={{ width: "100%" }}>
                    <source
                      src={`http://localhost:3000/${note.file}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <a
                    href={`http://localhost:3000/${note.file}`}
                    download
                    className="btn btn-primary mt-2 my-2"
                    style={{
                      color: "white",
                      backgroundColor: " rgb(94, 63, 45)",
                      borderRadius: "30000000px",
                    }}
                  >
                    Download Video
                  </a>
                </>
              )}
              {note.file.match(/\.pdf$/) && (
                <>
                  <iframe
                    src={`http://localhost:3000/${note.file}`}
                    width="100%"
                    height="100%"
                    title="PDF Viewer"
                  ></iframe>
                  <a
                    href={`http://localhost:3000/${note.file}`}
                    download
                    className="btn btn-primary mt-2 my-2 mx-5"
                    style={{
                      color: "white",
                      backgroundColor: " rgb(94, 63, 45)",
                      borderRadius: "30000000px",
                    }}
                  >
                    Download PDF
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
