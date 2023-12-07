import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";

function AddArea() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post(
        "/upload",
        uploadData
      );
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArea = {
      name,
      image: imageUrl,
    };

    try {
      const response = await service.post("/areas", newArea);
      console.log(response);
      navigate("/admin/area-list");
      // props.getData();
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <div className="form-container">
      <h3>New Area</h3>
      <form onSubmit={handleSubmit} className="reservation-form">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <br />
        <br />
        <div>
          <label>Image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        <button disabled={isUploading}>Add</button>
      </form>
    </div>
  );
}

export default AddArea;
