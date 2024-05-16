import { useState } from "react";
import SwiperProduct from "../SwiperAddProducts/SwiperProduct";

function ImageUpload() {
  const [file, setFile] = useState([]);

  function handleChange(e) {
    setFile([...file, window.URL.createObjectURL(e.target.files[0])]);
    console.log(file);
  }

  return (
    <div className="App">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <SwiperProduct previews={file}></SwiperProduct>
    </div>
  );
}

export default ImageUpload;
