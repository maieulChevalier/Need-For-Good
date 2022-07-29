export const state = () => ({
  robotProgressionRate: 5,
});

export const getters = {
  robotProgressionRate(state) {
    return state.robolotProgressionRate;
  },
};

export const mutations = {
  increaseRobotProgressionRate(state, totalLinesToComplete) {
    state.robotProgressionRate =
      state.robotProgressionRate + 100 / totalLinesToComplete;
  },
  resetRobotProgressionRate(state) {
    state.robotProgressionRate = 5;
  },
};

// export const actions = {
//   async fetchCounter(state) {
//     // make request
//     const res = { data: 10 };
//     state.counter = res.data;
//     return res.data;
//   },
// };
