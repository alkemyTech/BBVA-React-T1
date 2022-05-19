import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Get, PrivatePost, Put } from "../../../Services/privateApiService";
import "./NewsForm.css";
import SnackBarMessage from "../../Message/SnackBarMessage";

const NewsForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    content: "",
    image: "",
  });

  const [showMessage, setShowMessage] = useState({
    status: false,
    message: "",
    type: "",
  });
  const { status, message, type } = showMessage;
  const handleClose = () => {
    setShowMessage({
      ...showMessage,
      status: false,
    });
  };

  const { id } = useParams();
  const history = useHistory();

  const handleImage = (e) => {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setInitialValues({ ...initialValues, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !!initialValues.name &&
      !!initialValues.content &&
      !!initialValues.image
    ) {
      if (id) {
        try {
          await Put(
            process.env.REACT_APP_URL_BASE_ENDPOINT +
              process.env.REACT_APP_URL_NEWS_PATH +
              "/" +
              id,
            initialValues
          );
          setShowMessage({
            status: true,
            message: "Novedad actualizada correctamente",
            type: "success",
          });
          history.push("/backoffice/news");
        } catch (e) {
          setShowMessage({
            status: true,
            message: "Lo sentimos! Algo salió mal",
            type: "error",
          });
        }
      } else {
        try {
          await PrivatePost(
            process.env.REACT_APP_URL_BASE_ENDPOINT +
              process.env.REACT_APP_URL_NEWS_PATH,
            initialValues
          );
          setShowMessage({
            status: true,
            message: "Novedad creada correctamente",
            type: "success",
          });
          history.push("/backoffice/news");
        } catch (e) {
          setShowMessage({
            status: true,
            message: "Lo sentimos! Algo salió mal",
            type: "error",
          });
        }
      }
    } else {
      setShowMessage({
        status: true,
        message: "Debe completar todos los campos",
        type: "error",
      });
    }
  };

  return (
    <div className="news-form-container">
      <form className="news-form" onSubmit={handleSubmit}>
        <h1>{id ? "Actualizar novedad" : "Crear novedad"}</h1>
        <TextField
          id="outlined-basic"
          label="Título"
          variant="outlined"
          type="text"
          name="name"
          className="title-input"
          value={initialValues.name}
          onChange={handleChange}
          required
        />
        <CKEditor
          editor={ClassicEditor}
          value={initialValues.content}
          required
          onChange={(event, editor) =>
            setInitialValues({
              ...initialValues,
              content: editor.getData(),
            })
          }
        />
        <h4>Inserte una imagen</h4>
        <input
          accept=".png, .jpg, .jpeg"
          type="file"
          name="image"
          onChange={handleImage}
          required
        />
        <Button className="news-submit-btn" variant="contained" type="submit">
          {id ? "Actualizar" : "Crear"}
        </Button>
      </form>
      <SnackBarMessage
        estado={status}
        handleClose={handleClose}
        type={type}
        message={message}
      />
    </div>
  );
};

export default NewsForm;
