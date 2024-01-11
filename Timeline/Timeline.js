import profilePic from "../Images/profile-pic.png";
import feeling from "../Images/feeling.png";
import photo from "../Images/photo.png";
import { UserContext } from "../UserContext/UserContext";
import { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Timeline = () => {
  const { data, setData } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    mindThoughts: "",
    Image: null,
  };
  const [textArea, setTextArea] = useState(initialValues);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setTextArea({ ...textArea, image: file });
    } else {
      const { name, value } = e.target;
      setTextArea((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updatedTimeline = {
    mindThoughts: textArea.mindThoughts,
    id: data?.aridnoExist?._id,
    name:data?.aridnoExist?.name,
    image: textArea.image,
  };
  console.log(updatedTimeline)
  const postButton = async () => {
    toast ("Posting your post")
    await axios
      .post("http://localhost:5000/post/createpost", updatedTimeline, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res?.data);
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <>
      <div class="main-content">
        <div class="write-post-container">
          <div class="timelineCircleContainer">
            <img className="timeline-preview-Image" src={data?.aridnoExist?.imageUrl} />
          </div>

          <div className="profile-title">
            <p>
              {data?.aridnoExist?.name}({data?.aridnoExist?.aridno})
            </p>
          </div>

          <div className="post-input-container">
            <textarea
              rows="3"
              placeholder="what's on on your mind"
              name="mindThoughts"
              value={textArea.mindThoughts}
              onChange={(e) => handleChange(e)}
            ></textarea>

            <div className="add-post-links">
              <a>
                <img src={photo} />
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  onChange={(e) => handleChange(e)}
                ></input>
              </a>
              <button className="post-btn" onClick={postButton}>
                POST
              </button>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Timeline;
