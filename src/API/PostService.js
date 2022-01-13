import axios from "axios";

export default class PostService {
    static async getToken(login, pass) {
        const response = await axios.post('https://development.nabatik.com/api/v1.0/auth/signin?email='+login+'&password='+pass)
        return response
    }
}
