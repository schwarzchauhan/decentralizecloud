// module to examine/ensure that pinata cloud is connected to our application

import axios from "axios";

const testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;
    return axios
        .get(url, {
            headers: {
                'pinata_api_key': "8c03d31d88531abe42dc",
                'pinata_secret_api_key': "950ca8bb2917ba89e252729c4698cf092263af6252cb7a2046161bf95d8e6008"
            }
        })
        .then(function (response) {
            //handle your response here
        })
        .catch(function (error) {
            //handle error here
        });
};
export default testAuthentication;