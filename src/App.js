import "./App.css";
import Form from "./components/Form";
import FinalPage from "./components/FinalPage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SetAlbum from "./components/SetAlbum";

function App() {
  const [data, setData] = useState("");
  const [error, setError] = useState();

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("laci");
        const response = await axios(`/album/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const PageDisplay = () => {
    if (data === 1) {
      return (
        <div className="App">
          <Form />
        </div>
      );
    } else if (data === 0) {
      return (
        <div className="App">
          <FinalPage />
        </div>
      );
    }
  };
  return <div className="App">{PageDisplay()}</div>;
}

export default App;
