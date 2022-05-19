import React from "react"
import { Button, CssBaseline, StyledEngineProvider, TextField, InputAdornment } from "@mui/material";

import { Get } from './../../../Services/privateApiService';
import './Organization.css';

const Organization = () =>{
    const [ organizationData , setOrganizationData ] = React.useState({
        id:'',
        name:"",
        logo:"",
        short_description:"",
        long_description:"",
        welcome_test:"",
        address:"",
        cellphone:"",
        facebook_url:"",
        linkedin_url:"",
        instagram_url:"",
        twitter_url:"",
    });
    const [keys, setKeys] = React.useState([]);

    const changesHandler = event =>{
        setOrganizationData({ ...organizationData, [event.target.name]: event.target.value });
    }

    const getOrgData = async () => {
        try {
            const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ORGANIZATION_PATH);
            setKeys(Object.keys(res.data.data));
            setOrganizationData(res.data.data);
        } catch (err) {
            return err;
        }
    }

    const submitHandler = () => {
        console.log('submit');
    }
    React.useEffect(() => {
        getOrgData();
    }, []);
    return (
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <div className="organization-container">
          <h1 className="organization-title">Organization Info</h1>
          <form className="organization-form " action="">
            <TextField
                name=''
                onChange={changesHandler}
              id="id"
              className="text-field"
              label="id"
              variant="outlined"
              value={organizationData["id"]}
              sx={{ display: "none" }}
            />
            <div className="row ">
              <TextField
                name='name'
                onChange={changesHandler}
                id="name"
                className="text-field w-50"
                label="name"
                variant="outlined"
                value={organizationData["name"]}
              />
              <TextField
                name='welcome_text'
                onChange={changesHandler}
                id="welcome-text"
                className="text-field w-50"
                label="Welcome text"
                variant="outlined"
                value={organizationData["welcome_text"]}
              />
            </div>
            <div className="row ">
              <img
                className="w-50"
                src={organizationData["logo"]}
                alt={organizationData["logo"]}
              />
              <TextField
                name='logo'
                onChange={changesHandler}
                id="logo"
                className="text-field w-50"
                label="logo"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">url</InputAdornment>
                  ),
                }}
                value={organizationData["logo"]}
              />
            </div>
            <div className="row ">
              <TextField
                name='phone'
                onChange={changesHandler}
                id="phone"
                className="text-field w-50"
                label="phone"
                variant="outlined"
                value={organizationData["phone"]}
              />
              <TextField
                name='cellphone'
                onChange={changesHandler}
                id="cellphone"
                className="text-field w-50"
                label="cellphone"
                variant="outlined"
                value={organizationData["cellphone"]}
              />
            </div>
            <div className="row">
            <TextField
                name='address'
                onChange={changesHandler}
                id="address"
                className="text-field w-90"
                label="Address"
                variant="outlined"
                value={organizationData["address"]}
              />
            </div>
            <div className="row">
              <TextField
                name='short_description'
                onChange={changesHandler}
                multiline
                id="short_description"
                className="text-field w-90"
                label="Short Description"
                variant="outlined"
                value={organizationData["short_description"]}
              />
            </div>
            <div className="row">
              <TextField
                name='long_description'
                onChange={changesHandler}
                multiline
                id="long_description"
                className="text-field w-90"
                label="Description"
                variant="outlined"
                value={organizationData["long_description"]}
              />
            </div>
            <div className="row">
              <TextField
                name='facebook_url'
                onChange={changesHandler}
                id="facebook"
                className="text-field w-50"
                label="Facebook"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">url</InputAdornment>
                  ),
                }}
                value={organizationData["facebook_url"]}
              />
              <TextField
                name='linkedin_url'
                onChange={changesHandler}
                id="linkedin"
                className="text-field w-50"
                label="LinkedIn"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">url</InputAdornment>
                  ),
                }}
                value={organizationData["linkedin_url"]}
              />
            </div>
            <div className="row">
              <TextField
                name='instagram_url'
                onChange={changesHandler}
                id="instagram"
                className="text-field w-50"
                label="Instagram"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">url</InputAdornment>
                  ),
                }}
                value={organizationData["instagram_url"]}
              />
              <TextField
                name='twitter_url'
                onChange={changesHandler}
                id="twitter"
                className="text-field w-50"
                label="Twitter"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">url</InputAdornment>
                  ),
                }}
                value={organizationData["twitter_url"]}
              />
            </div>
            <div className="row">
              <Button className="edit-btn"
                variant="contained"
                onClick={() => {
                  submitHandler();
                }}
              >
                Editar
              </Button>
            </div>
          </form>
        </div>
      </StyledEngineProvider>
    );
}

export default Organization