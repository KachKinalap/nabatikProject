import axios from "axios";
export default class PostService {

    static async getToken(login, pass) {

        const resp = await axios.post('https://development.nabatik.com/api/v1.0/auth/signin?email=' + login + '&password=' + pass)

        return resp
    }

    static async postPhoto(image, point, token, trunk_diameter, tree_height) {

        let myToken = 'access_token=' + token
        let formData = new FormData()
        formData.append('images', {
            uri:image.uri,
            name:image.filename?image.filename:image.uri.split('/')[image.uri.split('/').length-1],
            type:'image/jpg'
        });

        try{
            let response = await axios.post('https://development.nabatik.com/api/v1.0/planter/plant', formData, {
                maxBodyLength:8000000,
                maxContentLength:8000000,
                params: {
                    point: {"type":"Feature","geometry":{"type":"Point","coordinates":[36.0743169,52.9882371]}},
                    trunk_diameter: trunk_diameter,
                    tree_height: tree_height
                },
                headers: {
                    "Cookie":myToken
                }
            });
                return response
        } catch(error){
            console.log('error', error)
        }
    }
}

