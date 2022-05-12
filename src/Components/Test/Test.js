import { Post } from './../../Services/publicApiService';

function Test(){

    var bodyFormData = new FormData();
        
         Post(
          "register",
          {
            name: "juafdgn",
            email: "judfhdrgfsdan@gmail.com",
            password: "lkdsdjfzhnl",
          }
        ).then(a => {
            console.log("blabla " + a);
        }).catch(e => {
            console.log("err " + e);
        })

      

    return(
        <>
        </>
    )
}

export default Test;