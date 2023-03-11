import React, { useState } from "react";
import Welcome from "./Welcome";
import SetAlbum from "./SetAlbum";
import SetLocation from "./SetLocation";
import SetAlbumName from "./SetAlbumName";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    albumName: "",
    location: "",
  });

  const FormTitles = [
    "Welcome",
    "Let's create your album!",
    "Where have you been?",
    "Upload your photos and videos of your trip",
  ];

  // amelyik page vagyunk azt jeleniti meg a body tagbe, mert ott hivjuk meg ezt a fuggvenyt
  const PageDisplay = () => {
    if (page === 0) {
      return <Welcome />;
    } else if (page === 1) {
      return <SetAlbumName formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <SetLocation formData={formData} setFormData={setFormData} />;
    } else {
      return <SetAlbum />;
    }
  };

  const showPrevButton = page > 0;
  const showNextButton = page < FormTitles.length - 1;

  return (
    <div className="form">
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>

        <div className="footer">
          {showPrevButton && (
            <button
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
          )}

          {showNextButton && (
            <button
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              {page === 0 ? "Start" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
