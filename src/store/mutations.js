import * as types from "./mutation-types"

export const mutations = {
  [types.SET_SEARCHKEYWORD](state,keyword){
    state.keyword = keyword
  }
}