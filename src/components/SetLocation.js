import React from "react";

function SetLocation({ formData, setFormData }) {
  return (
    <div className="set-location-container">
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(event) =>
          setFormData({ ...formData, location: event.target.value })
        }
      ></input>
    </div>
  );
}

export default SetLocation;
