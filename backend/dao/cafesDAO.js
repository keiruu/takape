import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let cafes

//THE COMMAND TO UPLOAD THE DOCS BECAUSE I MIGHT FORGET AGAIN
//mongoimport --host (shard) --authenticationDatabase admin --ssl --username (username) --password (password) --db takape --collection cafes  --type csv --headerline --file cafe_data.csv
// dao = data access object
export default class CafesDAO {
    static async injectDB(conn){
        if(cafes){
            return
        }
        try {
            cafes = await conn.db(process.env.CAFES_NS).collection("cafes")
            // update the field names because I imported it wrong 
            // cafes.updateMany( {}, { $rename: { "cafe_name": "name", "PROVINCE": "province", "CITY": "city", "ADDRESS": "address", "SOCMED_LINK": "socials"} } )
        } catch (e){
            console.error(`Unable to establish a connection handle in cafesDAO: ${e}`)
        }
    }

    static async getCafes({
        province = null,
        city = null,
        page = 0,
        cafesPerPage = 10,
    } = {}) {

        let query

        if(province){
            if(city){
                query = {"province": {$eq: province}, "city": {$eq: city}}
            }
        }

        let cursor

        try{
            // find all the cafes depending on the query
            cursor =  await cafes
                .find(query)
        } catch(e){
            console.error(`Unable to issue find command ${e}`)
            return {cafesList: [], totalNumCafes: 0}
        }

        const displayCursor = cursor.limit(cafesPerPage).skip(cafesPerPage * page)

        try{
            const cafesList = await displayCursor.toArray()
            const totalNumCafes = await cafes.countDocuments(query)

            return { cafesList, totalNumCafes }
        } catch(e){
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {cafesList: [], totalNumCafes: 0}
        }
    }

    static async getCafeByID(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                  {
                      $lookup: {
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$cafe_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await cafes.aggregate(pipeline).next()
        } catch (e) {
          console.error(`Something went wrong in getCafesByID: ${e}`)
          throw e
        }
      }
}