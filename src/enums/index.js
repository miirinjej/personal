import { readonly } from 'vue';

import LOCALES from './locales';
import MUTATION_TYPES from './mutation-types';
import ROUTING from './routing';

const enums = {
  LOCALES,
  MUTATION_TYPES,
  ROUTING,
};

export default readonly(enums);
