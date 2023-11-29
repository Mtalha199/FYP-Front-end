import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CreatePageModal/CreatePageModal.css';
import axios from "axios";

const CreatePageModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loader,setloader]=useState(false)
  const handleShow = () => setShow(true);

  const initialValues = {
    pgName: "",
    Image: null,
    coverImage: null,
  };
  const [pages, setPages] = useState(initialValues);

  const handleChange = (e) => {
      if(e.target.name === "Image")
      {
          const file = e.target.files[0];
          setPages({ ...pages, Image: file });
        }
        else if(e.target.name === "coverImage")
        {
          const file = e.target.files[0];
          setPages({ ...pages, coverImage: file });
        }
        else {
          const { name, value } = e.target;
          setPages((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
  }
//   console.log(pages)

  const updatedData={
      pagename:pages.pgName,
      Image:pages.Image,
      coverImage:pages.coverImage,
  }
  console.log(updatedData)
  const postPageData=async()=>{
       setloader(true)
      await axios.post("http://localhost:5000/createPage",updatedData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res)=>{
            setloader(false)
          console.log(res.data)
         
          handleClose()
          toast.success(res.data)
          window.location.reload();
      }).catch((err)=>{
          console.log(err)
          handleClose()
      })
    }

    return ( 
        <>
        <Button variant="primary" className="modal-btn" onClick={handleShow}>
        Create Page
      </Button>

      <Modal show={show} className="helloModal" onHide={handleClose}>
        <Modal.Header className="modal-title">
          <Modal.Title className="name-">Create New Page</Modal.Title>
        </Modal.Header>
        {loader ? <>Wait a while Page is creating</> : <>  <Modal.Body className="modal-body">
          <div className="model-wrapper">

          <div className="container">
              <div className="input-field">
              <input type="text"name="pgName"required value={pages.pgName} onChange={handleChange}/> <span>Page Name</span>
              </div>

              <label className="modal-label">
                Choose Profile Photo
                {/* <input type="file" size="60" /> */}
                <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={handleChange} 
                 />
              </label>

              <div className="model-cover">
                <label className="modal-label">
                  Choose Cover Photo
                  {/* <input type="file" size="60" /> */}
                  <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
              </div>

            </div>


          
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postPageData}>
            Save Changes
          </Button>
        </Modal.Footer></>}
      
      </Modal>
      <ToastContainer />
        
        </>
     );
}
 
export default CreatePageModal;