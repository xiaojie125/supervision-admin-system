const state = {
  showPersonal: true,
};

const mutations = {
  CHANGE_PERSONAL: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changePersonal({ commit }, data) {
    commit("CHANGE_PERSONAL", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
