import React from "react"
import { TextField } from "@mui/material"
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
    //const keys =Object.keys(organizationData);

    const getOrgData = async () => {
        try {
            const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ORGANIZATION_PATH);
            setKeys(Object.keys(res.data.data));
            setOrganizationData(res.data.data);
        } catch (err) {
            return err;
        }
    }

    React.useEffect(() => {
        getOrgData();
    }, []);
    console.log({keys});
    return (
        <div className="organization-container">
            <form className='organization-form border' action="">
            {keys.map( key => {
                return (
                  <TextField
                    id="text-field"
                    label={key}
                    key={key}
                    variant="outlined"
                    value={organizationData[key]}
                    sx={key === "id" ? { display: "none" } : {}}
                  />
                );
            })
            }
            </form>
        </div>
    )
}

export default Organization