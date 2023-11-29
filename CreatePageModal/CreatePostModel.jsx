import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePostModel = (props) => {
    const {pageId,name}=props
    console.log(pageId)
    console.log(name)
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loader,setloader]=useState(false)
  const handleShow = () => setShow(true);


  const initialValues = {
    mindThoughts: "",
    Image: null,
  };
  const [textArea, setTextArea] = useState(initialValues);
  const handleChange = (e) => {
    if (e.target.name === "Image") {
      const file = e.target.files[0];
      setTextArea({ ...textArea, Image: file });
    } else {
      const { name, value } = e.target;
      setTextArea((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
console.log(textArea)
const updatedPostData={
    mindThoughts:textArea.mindThoughts,
    id:pageId,
    name:name,
    image:textArea.Image
    
}
console.log(updatedPostData)
const postButton = async () => {
    setloader(true)
    toast ("Posting your post")
    await axios
      .post("http://localhost:5000/post/createpost", updatedPostData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res?.data);
        setloader(false)
        handleClose()
        // navigate("/profile");
        window.location.reload();

      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
 
    return (  
        <>
  <Button variant="primary" className="modal-btn" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} className="helloModal" onHide={handleClose}>
        <Modal.Header className="modal-title">
          <Modal.Title className="name-">Create New Post</Modal.Title>
        </Modal.Header>
        {loader ? <>Wait a while Post is creating</> : <>  <Modal.Body className="modal-body">
          <div className="model-wrapper">

          <div className="container">
              <div className="input-field">
              <input type="text"name="mindThoughts" required 
              value={textArea.mindThoughts} 
              onChange={handleChange}
              /> <span>Mind Thoughts</span>
              </div>

              <label className="modal-label">
                Choose Photo
                {/* <input type="file" size="60" /> */}
                <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={handleChange} 
                 />
              </label>

            </div>


          
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postButton}>
            Save Changes
          </Button>
        </Modal.Footer></>}
      
      </Modal>
      <ToastContainer />
        </>
    
    );
}
 
export default CreatePostModel;