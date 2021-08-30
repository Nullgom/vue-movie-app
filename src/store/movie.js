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
    async searchMovies({ state, commit }, payload) {
      const { title, type, number, year } = payload
      const OMDB_API_KEY='7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults} = res.data
      commit('updateState', {
        movies: Search
      })
      console.log(totalResults) // 263
      console.log(typeof totalResults) // string

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10) // 263 / 10  -> 27

      // 추가 요청!
      if(pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > number / 10) break;
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ...Search]
          })
        }
      }
    }
  }
}