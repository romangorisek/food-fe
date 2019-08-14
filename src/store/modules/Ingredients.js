import api from '@/api/Ingredients'
import EventBus from '@/EventBus'

const state = {
  all: []
}

const getters = {
    filtered: (state) => (filter) => {
        return state.all.filter(ingredient => ingredient.title.toLowerCase().includes(filter.toLowerCase()))
    },
    byId: (state) => (id) => {
      for (let ingredient of state.all) {
        if (ingredient.id === id) return ingredient
      }
    }
}

const actions = {
  getAll({ commit }) {
    api.index().then(res => {
      commit('setAll', res.data)
    })
  },
  create({ commit, state }, ingredient) {
    api.create(ingredient).then(res => {
      commit('addNewIngredient', res.data)
      console.log("fire ingredient-created event")
      EventBus.$emit('ingredient-created', res.data)
    })
  },
  delete({ commit, state }, ingredient) {
    api.delete(ingredient).then(res => {
      if (res.data.success) {
        commit('remove', ingredient)
      }
    })
  }
}

const mutations = {
  setAll(state, ingredients) {
    state.all = ingredients
  },
  addNewIngredient(state, ingredient) {
    state.all.push(ingredient)
  },
  remove(state, deletedIngredient) {
    state.all = state.all.filter(ingredient => ingredient.id !== deletedIngredient.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}