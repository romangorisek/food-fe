import Api from './Api'

export default {
    get (id) {
        return Api().get(`dishes/${id}`)
    },
    index (search) {
        let url = 'dishes'
        if (search) {
            url += '?search=' + search
        }
        return Api().get(url)
    },
    delete(dish) {
        return Api().delete(`dishes/${dish.id}`)
    },
    create (dish) {
        dish.meal_id = 'a6e9d279-0ff1-4a28-8b03-563967f00c6e'
        return Api().post(`dishes`, dish)
    },
    update(dish) {
        return Api().put(`dishes/${dish.id}`, dish)
    }
}
