import express from 'express'
import CafeCtrl from "./cafes.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(CafeCtrl.apiGetCafes)
router.route("/id/:id").get(CafeCtrl.apiGetCafeById)


router.route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router