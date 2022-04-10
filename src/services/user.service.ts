import { axiosInstance } from "./axios.service"

const getUser = () => {
    axiosInstance
    .get("/auth-service/get-user")
    .then(response => console.log(response));
}

export const userService =  {
    getUser
}