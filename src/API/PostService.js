import axios from "axios";
export default class PostService {

    static async getToken(login, pass) {

        const resp = await axios.post('https://development.nabatik.com/api/v1.0/auth/signin?email=' + login + '&password=' + pass)

        return resp
    }

    static async postPhoto(image, point, token, trunk_diameter, tree_height) {

        //if (images && images.length > 0) {
            //for(let i = 0; i < images.length; i++) {
                //formData.append('images', {uri: image, name: 'photo.png', type: 'image/png'});

            //}
        //}

        let myToken = 'access_token=' + token
        let formData = new FormData()
        formData.append('images', {uri:image.uri, name:image.filename, type:'image/jpg'});
        //formData.append('images', image)
        //formData.append('Content-Type', 'image/jpg')
        console.log(point, trunk_diameter, tree_height);
        // axios.interceptors.request.use(function (config) {
        //     // Do something before request is sent
        //     console.log(config)
        // }, function (error) {
        //     // Do something with request error
        //     //console.log(error)
        // });
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
                    //"Content-Type": "form-data",
                    "Cookie":myToken
                }
            });

                return response
        } catch(error){
            console.log('error', error)

        }



    }

}

/*
{{api_url}}/planter/plant?
point={"type":"Feature","geometry":
{"type":"Point","coordinates":[36.0743169,52.9882371]}}
&trunk_diameter=2.0
&tree_height=1.0
 */
