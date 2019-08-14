import Api from './Api'

export default {
    get (id) {
        return Api().get(`ingredients/${id}`)
    },
    index () {
        return Api().get(`ingredients`)
    },
    delete(dish) {
        return Api().delete(`ingredients/${dish.id}`)
    },
    create (dish) {
        console.log(dish)
        return Api().post(`ingredients`, dish)
    }
}