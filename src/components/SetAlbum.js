import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FormData from "form-data";

async function postImage(image) {
  console.log("Image: ", image);
  const formData = new FormData();

  for (let i = 0; i < image.length; i++) {
    formData.append("img", image[i]);
  }

  try {
    await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (err) {
    console.error("Error response:");
    console.error(err.response.data); // ***
    console.error(err.response.status); // ***
    console.error(err.response.headers); // ***
  }
}

function SetAlbum() {
  //preview nézet
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [[file], setFile] = useState([]);

  const onSelectFile = (event) => {
    console.log("event-target-files: ", event.target.files);
    const selectedFiles = event.target.files;
    setFile((prevFiles) => prevFiles.concat(event.target.files));

    const selectedFlesArray = Array.from(selectedFiles);
    console.log("selectedFlesArray: ", selectedFlesArray);

    const imagesArray = selectedFlesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    console.log("imagesArray: ", imagesArray);

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  //képfeltöltés
  const submit = async () => {
    console.log(selectedImages);
    const result = await postImage(file);
    //setImages([result.image, ...images]);
  };

  return (
    <section>
      <Box mt={6}>
        <label htmlFor="file-input" className="upload-label">
          <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
          <span className="upload-text">+ Add Images</span>
          <span className="upload-subtext">up to 10 images</span>
          <input
            type="file"
            id="file-input"
            name="image"
            onChange={onSelectFile}
            multiple
            accept="image/png, image/jpeg, image/webp"
            hidden
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
                submit();
              }}
            >
              {" "}
              UPLOAD {selectedImages.length} IMAGE
              {selectedImages.length === 1 ? "" : "S"}
            </button>
          ))}

        <SimpleGrid columns={[3, 3, 3]} spacing={4}>
          {selectedImages &&
            selectedImages.map((image) => {
              return (
                <div
                  key={image}
                  className="image-wrapper"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={image}
                    alt="upload"
                    height="100px"
                    width="100px"
                    key={image}
                  />
                  <button
                    onClick={() =>
                      setSelectedImages(
                        selectedImages.filter((e) => e !== image)
                      )
                    }
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      borderRadius: "80%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              );
            })}
        </SimpleGrid>
      </Box>
    </section>
  );
}

export default SetAlbum;
