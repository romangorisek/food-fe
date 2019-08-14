import Api from './Api'

export default {
    random(dishes) {
        let dishIds = dishes.map(dish => dish.id)
        return Api().get(`mealPlans`, {
            params: {dish_ids: dishIds}
        })
    },
    index(week) {
        return Api().get(`mealPlans/${week}`)
    },
    create(data) {
        return Api().post(`mealPlans`, data)
    },
    delete(params) {
        return Api().delete(`mealPlans`, {params})
    }
}