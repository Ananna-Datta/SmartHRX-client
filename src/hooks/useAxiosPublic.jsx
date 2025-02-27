import axios from "axios";

const axiosPublic = axios.create({
    baseURL: window.location.hostname === 'localhost'
        ? 'http://localhost:5000' 
        : 'https://smart-hrx-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;