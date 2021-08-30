import axios from 'axios'

export default {
  namespaced: true, // module!
  state: () => ({ // data!
    movies: [],
    message: '',
    loading: false
  }),  
  getters: { }, // computed!
  // methods!
  mutations: { // 변이
    updateState(state, payload) {
      //  ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },  
  actions: { // 비동기로 동작
    async searchMovies({ commit }, payload) {
      const { title, type, number, year } = payload
      const OMDB_API_KEY='7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults} = res.data
      commit('updateState', {
        movies: Search
      })
    }
  }
}