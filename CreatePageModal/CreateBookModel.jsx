import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer,toast } from "react-toastify";
import '../CreatePageModal/bookmodalstyle.css';
import "react-toastify/dist/ReactToastify.css";

const CreateBookModel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loader, setloader] = useState(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    bookName: "",
    bookAuthor: "",
    bookEdition: "",
    bookPdf: null,
    bookCover: null,
  };

  const [book, setBook] = useState(initialValues);

  const handleChange = (e) => {
    if (e.target.name === "bookPdf") {
      const file = e.target.files[0];
      setBook({ ...book, bookPdf: file });
    } else if (e.target.name === "bookCover") {
      const file = e.target.files[0];
      setBook({ ...book, bookCover: file });
    } else {
      const { name, value } = e.target;
      setBook((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  console.log(book);
  const formData = new FormData();
  formData.append("bookName", book.bookName);
  formData.append("bookAuthor", book.bookAuthor);
  formData.append("bookEdition", book.bookEdition);
  formData.append("bookPdf", book.bookPdf);
  formData.append("bookCover", book.bookCover);

  const handleSubmit = async (event) => {
    // alert("ghkj")
    event.preventDefault();
    setloader(true);

    const response = await axios
      .post(
        "http://localhost:5000/uploadBook",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setloader(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button variant="primary" className="modal-btn" onClick={handleShow}>
        Upload Book
      </Button>

      <Modal show={show} className="helloModal" onHide={handleClose}>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <Modal.Header className="modal-title">
            <Modal.Title className="name-">Add a New Book</Modal.Title>
          </Modal.Header>
          {loader ? (
            <>Wait a while Page is creating</>
          ) : (
            <>
              {" "}
              <Modal.Body className="modal-body">
                <div className="model-wrapper">
                  <div className="container">
                    <div className="input-field">
                      <input
                        type="text"
                        name="bookName"
                        required
                        value={book.bookName}
                        onChange={handleChange}
                      />{" "}
                      <span>Book Name</span>
                    </div>

                    <div className="input-field">
                      <input
                        type="text"
                        name="bookAuthor"
                        required
                        value={book.bookAuthor}
                        onChange={handleChange}
                      />{" "}
                      <span>Book Author</span>
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        name="bookEdition"
                        required
                        value={book.bookEdition}
                        onChange={handleChange}
                      />{" "}
                      <span>Book Edition</span>
                    </div>
                    <label className="modal-label">
                      Choose Book
                      <input
                        type="file"
                        name="bookPdf"
                        accept=".pdf"
                        onChange={handleChange}
                      />
                    </label>
                    <label className="modal-label">
                      Choose cover of Book
                      <input
                        type="file"
                        name="bookCover"
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
                <Button variant="primary" type="submit">
                  Upload Book
                </Button>
              </Modal.Footer>
            </>
          )}
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CreateBookModel;
