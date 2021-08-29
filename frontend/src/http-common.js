import axios from "axios"

// Make http requests from node.js
// this creates a new instance of axios with custom configs
// docs: https://www.npmjs.com/package/axios

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/cafes",
    headers: {
        "Content-type": "application/json"
    }
})