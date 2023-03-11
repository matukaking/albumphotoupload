import React from "react";

function SetAlbumName({ formData, setFormData }) {
  return (
    <div className="sign-up-container">
      <input
        className="inputBox"
        type="text"
        placeholder="Album name"
        value={formData.albumName}
        onChange={(event) =>
          setFormData({ ...formData, albumName: event.target.value })
        }
      ></input>
    </div>
  );
}

export default SetAlbumName;
