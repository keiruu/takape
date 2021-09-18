import axios from "axios"

// Make http requests from node.js
// this creates a new instance of axios with custom configs
// docs: https://www.npmjs.com/package/axios

export default axios.create({
    baseURL: "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/takape-vhlum/service/cafes/incoming_webhook/",
    headers: {
        "Content-type": "application/json"
    }
})