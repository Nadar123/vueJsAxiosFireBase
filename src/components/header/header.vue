<template>
  <header id="header">
    <div class="logo">
      <router-link to="/"> LOGO </router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="auth">
          <button @click="onLogut" class="logout"> Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  computed : {
    auth() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogut() {
      return this.$store.dispatch('logout')
    }
  },
}
</script>
<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #173c52;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
  .logout {
    background-color: transparent;
    padding: 9px 30px;
    color: #fff;
    font-size: 15px;
    line-height: 15px;
    transition: background-color 0.2 ease-in-out;
    cursor: pointer;
  }
  .logout:hover {
    background-color: rgba(255,255,255, 0.3);
  }
</style>