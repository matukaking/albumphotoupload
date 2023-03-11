import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
function SetAlbum() {
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFlesArray = Array.from(selectedFiles);

    const imagesArray = selectedFlesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  return (
    <section>
      <label htmlFor="images">
        + Add Images
        <br />
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/pngm, image/jpeg, image/webp"
        />
      </label>
      <br />
      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b>{selectedImages.length - 10}</b> of them
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log("UPLOAD IMAGES");
            }}
          >
            {" "}
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}
      <div id="img-wrapper">
        <div className="images">
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <img src={image} height="100px" alt="upload" />
                  <button
                    onClick={() =>
                      setSelectedImages(
                        selectedImages.filter((e) => e !== image)
                      )
                    }
                  >
                    TÖRLÉS
                  </button>
                  <p>{index + 1}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default SetAlbum;
