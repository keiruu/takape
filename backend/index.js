import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import CafesDAO from "./dao/cafesDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

//connect to mongodb
MongoClient.connect(
  process.env.CAFE_DB_URI, 
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }
).catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async client => {
  await CafesDAO.injectDB(client)
  await ReviewsDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})