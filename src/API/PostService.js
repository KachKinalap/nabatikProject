import axios from "axios";

export default class PostService {
    static async getToken() {
        axios.defaults.crossDomain = true;
        const name = 'testplanter@nabatik.com'
        const pass = 'testplanter'
        const response = await axios.post('https://development.nabatik.com/api/v1.0/auth/signin?email=testplanter@nabatik.com&password=testplanter')
        return response
    }
}
