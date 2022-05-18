import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewsForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    content: "",
    image: "",
    category: "",
  });

  const { id } = useParams();

  const type = id ? "update" : "create";

  const handleChange = (e) => {
    setInitialValues({...initialValues, [e.target.name]: e.target.value})
  };

  const handleImage = (e) => {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
    setInitialValues({...initialValues, image: reader.result})}
    reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
          value={initialValues.name}
          onChange={handleChange}
        />
        <CKEditor
          editor={ClassicEditor}
          value={initialValues.content}
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
        />
        <Button className="news-submit-btn" variant="contained" type="submit">
          {id ? "Actualizar" : "Crear"}
        </Button>
      </form>
    </div>
  );
};

export default NewsForm;
