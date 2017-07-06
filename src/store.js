/* eslint no-param-reassign: 0 */
import Vuex from 'vuex';
import { getHoldings } from './lib/holdings';

const createStore = () => new Vuex.Store({
  state: {
    holdings: [],
  },
  actions: {
    updateHoldings({ commit }) {
      return getHoldings().then((holdings) => {
        commit('setHoldings', holdings);
      });
    },
  },
  mutations: {
    setHoldings(state, holdings) {
      state.holdings = holdings;
    },
  },
});

export default createStore;
