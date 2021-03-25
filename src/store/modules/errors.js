import { nanoid } from 'nanoid';

import enums from '@/enums';

const {
  HANDLE_ERROR,
  SET_ERROR,
} = enums.MUTATION_TYPES;

const state = () => ({
  errors: [],
});

const actions = {
  async [HANDLE_ERROR]({ commit }, error) {
    commit(HANDLE_ERROR, await error);
  },
  async [SET_ERROR]({ commit }, error) {
    commit(SET_ERROR, await error);
  },
};

const mutations = {
  [HANDLE_ERROR](innerState, error) {
    const errorIndex = innerState.errors.indexOf(error);

    innerState.errors.splice(errorIndex, 1);
  },
  [SET_ERROR](innerState, error) {
    innerState.errors.push({
      id: nanoid(10),
      error,
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
