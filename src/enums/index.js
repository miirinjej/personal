import { readonly } from 'vue';

import LOCALES from './locales';
import MUTATION_TYPES from './mutation-types';

const enums = {
  LOCALES,
  MUTATION_TYPES,
};

export default readonly(enums);
