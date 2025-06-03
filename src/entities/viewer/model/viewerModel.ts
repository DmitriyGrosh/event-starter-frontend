import {createMemStorage, reatomPersist} from '@reatom/persist'

const ssrStorage = createMemStorage({ name: 'ssr', subscribe: false })
export const withSsr = reatomPersist(ssrStorage)
