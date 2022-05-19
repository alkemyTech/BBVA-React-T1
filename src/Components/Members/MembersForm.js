import React, { useState, useEffect } from "react";
import "../FormStyles.css";
import { useParams } from "react-router-dom";
import { Get, Put, PrivatePost } from "../../Services/privateApiService";
import Spinner from "./../Spinner/Spinner";
import { Snackbar, Alert, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { GetAppContext } from "../../index";

const MembersForm = () => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    image64: "",
    imageUrl: "",
    description: "",
    linkedinUrl: "",
    facebookUrl: "",
  });

  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const isUpdate = !!id;

  const { appData, setAppData } = GetAppContext();

  const setSpinner = (open) => {
    setAppData((prevState) => ({
      ...prevState,
      spinner: {
        open: open,
      },
    }));
  };

  const setSnackBar = (message, severity) => {
    setAppData((prevState) => ({
      ...prevState,
      snackbar: {
        ...prevState.snackbar,
        message: message,
        severity: severity,
        open: true,
      },
    }));
  };

  const snackErrorCargaDatos = () => {
    setSnackBar(
      "Error en la carga de datos, intente nuevamente mas tarde.",
      "error"
    );
  };

  const getMembers = () => {
    setSpinner(true);
    if (id) {
      Get(
        process.env.REACT_APP_URL_BASE_ENDPOINT +
          process.env.REACT_APP_URL_MEMBER_PATH +
          "/" +
          id.toString()
      )
        .then((res) => {
          const data = res.data.data;
          setInitialValues({
            ...initialValues,
            name: data.name || "",
            srcUrlImage: data.image || "",
            description: data.description || "",
            linkedinUrl: data.linkedinUrl || "",
            facebookUrl: data.facebookUrl || "",
            getData: res,
          });
          setSpinner(false);
        })
        .catch((e) => {
          snackErrorCargaDatos();
          setSpinner(false);
        });
    } else {
      setSpinner(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleChange = (e) => {
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  const imageToBase64 = (element) => {
    if (!element || !element.currentTarget.files) return;
    var file = element.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setInitialValues({ ...initialValues, image64: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const objectSend = {
      id: parseInt(!!id ? id : 2),
      name: initialValues.name,
      description: initialValues.description,
      image: initialValues.image64,
      linkedinUrl: initialValues.linkedinUrl,
      facebookUrl: initialValues.facebookUrl,
    };
    var promise = id
      ? Put(
          process.env.REACT_APP_URL_BASE_ENDPOINT +
            process.env.REACT_APP_URL_MEMBER_PATH +
            "/" +
            objectSend.id,
          objectSend
        )
      : PrivatePost(
          process.env.REACT_APP_URL_BASE_ENDPOINT +
            process.env.REACT_APP_URL_MEMBER_PATH,
          objectSend
        );

    promise.then((res) => {
      if (res.data.success) {
        history.push("/backoffice/members");
      } else {
        setSnackBar(
          "Error debe completar todos los casilleros y subir una imagen.",
          "error"
        );
      }
    });
  };

  return (
    <>
      <div className="membersform-container">
        <h2>{isUpdate ? "Actualizar miembro" : "Ingresar miembro"}</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            type="text"
            name="name"
            value={initialValues.name}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="Descripción"
            variant="outlined"
            type="text"
            name="description"
            value={initialValues.description}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="URL de LinkedIn"
            variant="outlined"
            type="url"
            name="linkedinUrl"
            value={initialValues.linkedinUrl}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="URL de Facebook"
            variant="outlined"
            type="url"
            name="facebookUrl"
            value={initialValues.facebookUrl}
            onChange={handleChange}
          />
          <p>Imagen:</p>
          <input accept="image/*" type="file" onChange={imageToBase64} />

          <button className="submit-btn" type="submit">
            {isUpdate ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MembersForm;
