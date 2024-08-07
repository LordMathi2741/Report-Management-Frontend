import { createStore } from 'vuex'
import UserService from '@/helpers/user.service.js'

const store = createStore({
  state: {
    user: null,
    token: null,
    userService: new UserService()
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async signIn({ commit, state }, { email, password }) {
      const response = await state.userService.signInUser(email, password);
      commit('setToken', response.data.token);
      return response;
    },
    async fetchUserNameByEmail({ commit, state }, email) {
      const response = await state.userService.getUserNameByEmail(email);
      commit('setUser', response.data);
      return response;
    }
  }
});

export default store;