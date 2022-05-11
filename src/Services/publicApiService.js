import axios from "axios";

const config = {
  headers: {
    Group: 1,
  },
};

const Get = (route, id = null) => {
  axios
    .get(`https://ongapi.alkemy.org/api/${route}/${id}`, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export { Get };
