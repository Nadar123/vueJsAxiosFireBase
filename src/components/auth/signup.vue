<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
            <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name"> Name </label>
          <input
            type="name"
            id="name"
            v-model="name"
            @blur="$v.name.$touch()"
          >
          <p class="err-msg" v-if="!$v.name.minLen"> Plz type your name </p>
        </div>

        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @blur="$v.email.$touch()"
          >
          <p class="err-msg" v-if="!$v.email.email">Email address is not vaild </p>
        </div>

        <div class="input" :class="{invalid: $v.age.$error}">
          <label for="age">Your Age</label>
          <input
            type="number"
            id="age"
            @blur="$v.age.$touch()"
            v-model.number="age"
          >
            <p class="err-msg" v-if="!$v.age.minVal"> You have to be {{ $v.age.$params.minVal.min }} yaers old </p>
        </div>

        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @blur="$v.password.$touch()"
          >
        </div>

        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            @blur="$v.confirmPassword.$touch()"
          >
        </div>

        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="israel">Israel</option>
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import 
  { required, minLength, between, email, 
    numeric, minValue, sameAs, requiredUnless } 
from 'vuelidate/lib/validators'
import axios from 'axios'
  export default {
    data () {
      return {
        name: '',
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'Israel',
      }
    },
    validations: {
      name: { required, minLen: minLength(3)},
      email: { 
        required, 
        email, 
        checkMail: val => {
          if(val === '') return true
          return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
          .then(res => {
            return Object.keys(res.data).length === 0
          })
          .catch((err) => console.log(error))
        }
      },
      age: { required, numeric, minVal: minValue(18) },
      password: { required, minLen: minLength(6) },
      confirmPassword: { sameAs: sameAs('password') },
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          hobbies: this.hobbyInputs.map(hobby => hobby.value),
          terms: this.terms
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
  };
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #173c52;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #173c52;
    background: #173c52;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #173c52;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #173c52;
    color: #173c52;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #173c52;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
  .input.invalid input {
    border: 1px solid red;
  }
  .input.invalid label {
    color: rgba(255, 10, 50, 0.4);
  }
  .input .err-msg {
    color:red;
    font-size: 12px;
  }
  p.required{
    color:red;
    font-size: 12px;
  }
</style>
