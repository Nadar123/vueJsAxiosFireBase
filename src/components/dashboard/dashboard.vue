<template>
  <div id="dashboard">
    <h1>dashboard!</h1>
    <p v-if="email"> Your Email: {{email}}</p>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>
<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>