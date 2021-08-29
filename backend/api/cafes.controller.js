import CafesDAO from "../dao/cafesDAO.js";

export default class CafesController{
    static async apiGetCafes(req, res, next){

        // req.query is basically anything that comes after ? in your URI example: http://localhost:5000/api/v1/cafes?name=cafe

        const cafesPerPage = req.query.cafesPerPage ? parseInt(req.query.cafesPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let province = ""
        let city = ""

        if(req.query.province){
          province = req.query.province
          if(req.query.city){
            city = req.query.city
          }
        }


        const { cafesList, totalNumCafes } = await CafesDAO.getCafes({
            province,
            city,
            page,
            cafesPerPage
        })

        let response = {
            cafes: cafesList,
            page: page,
            province: province,
            city: city,
            entries_per_page: cafesPerPage,
            total_results: totalNumCafes,
        }

        //send a json response with all the info (response) to the user
        res.json(response)
    }

    static async apiGetCafeById(req, res, next) {
        try {
          let id = req.params.id || {}
          let cafe = await CafesDAO.getCafeByID(id)
          if (!cafe) {
            res.status(404).json({ error: "Not found" })
            return
          }
          res.json(cafe)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
}