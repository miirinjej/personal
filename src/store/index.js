import { createStore } from 'vuex';

import errors from './modules/errors';

export default function createUniversalStore() {
  return createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      errors,
    },
  });
}
