import api from '@/api/Dishes'
import EventBus from '@/EventBus'

const state = {
  all: []
}

const getters = {
    filtered: (state) => (filter) => {
        return state.all.filter(dish => dish.title.toLowerCase().includes(filter.toLowerCase()))
    },
    byId: (state) => (id) => {
      for (let dish of state.all) {
        if (dish.id === id) return dish
      }
    }
}

const actions = {
  getAll({ commit }) {
    api.index().then(res => {
      commit('setAll', res.data)
    })
  },
  update({ commit, state }, dish) {
    api.update(dish).then(res => {
      commit('update', dish)
      EventBus.$emit('dish-updated')
    })
  },
  create({ commit, state }, dish) {
    api.create(dish).then(res => {
      commit('addNewDish', res.data)
      EventBus.$emit('dish-created')
    })
  },
  delete({ commit, state }, dish) {
    api.delete(dish).then(res => {
      if (res.data.success) {
        commit('remove', dish)
      }
    })
  }
}

const mutations = {
  setAll(state, dishes) {
    state.all = dishes
  },
  update(state, updatedDish) {
    let updatedDishes = []
    for (let dish of state.all) {
      let tempDish = dish.id === updatedDish.id ? updatedDish : dish
      updatedDishes.push(tempDish)
    }
    state.all = updatedDishes
  },
  addNewDish(state, dish) {
    state.all.push(dish)
  },
  remove(state, deletedDish) {
    state.all = state.all.filter(dish => dish.id !== deletedDish.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}