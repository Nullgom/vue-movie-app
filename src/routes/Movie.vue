<template>
  <h1>Movie!</h1>
</template>
<script>
export default {
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt123727
      id: this.$route.params.id
    })
  }
}
</script>