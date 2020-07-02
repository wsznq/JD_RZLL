import types from "../types";
const state = {
  isLoading: false,
  direction: "forward"
};

const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  [types.UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction;
  }
};

export default {
  state,
  mutations
};
