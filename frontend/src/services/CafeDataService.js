import http from '../http-common'

class CafeDataService {
    // functions to make api calls and return info from api calls
    // get = get a promise which returns a response object
    getAll(page = 0){
        return http.get(`cafes?page=${page}`)
    }
    
    get(id){
        return http.get(`/cafe?id=${id}`)
    }

    find(province, city, page = 0){
        return http.get(`cafes?province=${province}&city=${city}&page=${page}`)
    }

    createReview(data){
        return http.post("/review-new", data)
    }

    updateReview(data){
        return http.put("/review-edit", data)
    }

    deleteReview(id, userId){
        return http.delete(`/review-delete?id=${id}`, {data: {user_id: userId}})
    }
}

export default new CafeDataService();