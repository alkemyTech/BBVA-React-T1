import React from "react"
import { TextField } from "@mui/material"
import { Get } from './../../../Services/privateApiService';

const Organization = () =>{
    const [ organizationData , setOrganizationData ] = React.useState({
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
    })
    const keys =Object.keys(organizationData)

    React.useEffect(() => {
        Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ORGANIZATION_PATH).then(res =>{
            const data= res.data
            if(data.sucess){
                setOrganizationData(data.data)
            }
            else{
                //TODO ERROR
            }
        }
        )
        
    }, []);

    return (
        <>
            {keys.map( key => {
                return (
                    <>
                        <br/>
                        <br/>
                        <TextField id="outlined-basic" label={key} variant="outlined" value={organizationData[key]}/>
                    </>
                )
            })
            }
        </>
    )
}

export default Organization