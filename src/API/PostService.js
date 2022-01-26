import axios from "axios";
export default class PostService {

    static async getToken(login, pass) {

        const resp = await axios.post('https://development.nabatik.com/api/v1.0/auth/signin?email=' + login + '&password=' + pass)

        return resp
    }

    static async postPhoto(image, point, token, trunk_diameter, tree_height) {
        let myToken = 'access_token=' + token
        let formData = new FormData();
        //if (images && images.length > 0) {
            //for(let i = 0; i < images.length; i++) {
                formData.append('images', image);
                formData.append('Content-Type', 'image/jpg');
            //}
        //}
        //console.log(point, trunk_diameter, tree_height);
        // axios.interceptors.request.use(function (config) {
        //     // Do something before request is sent
        //     console.log(config)
        // }, function (error) {
        //     // Do something with request error
        //     //console.log(error)
        // });
        let response = await axios.post('https://development.nabatik.com/api/v1.0/planter/plant', formData, {
            maxBodyLength:8000000,
            maxContentLength:8000000,
            params: {
                point: point,
                trunk_diameter: trunk_diameter,
                tree_height: tree_height
            },
            headers: {
                "Content-Type": "multipart/form-data",
                "Cookie":myToken
            }
        });
        if (response.status === 200)
            return response.data;

    }

}

/*
{{api_url}}/planter/plant?
point={"type":"Feature","geometry":
{"type":"Point","coordinates":[36.0743169,52.9882371]}}
&trunk_diameter=2.0
&tree_height=1.0
 */
