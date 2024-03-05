import { createStore } from 'vuex';

export default createStore({
  state: {
    formData: {
      json1: {},
      json2: {},
      json3: {},
    },
  },
  mutations: {
    setFormData(state, { formName, data }) {
      state.formData[formName] = data;
    },
  },
  actions: {
    updateFormData({ commit }, payload) {
      commit('setFormData', payload);
    },
  },
});

