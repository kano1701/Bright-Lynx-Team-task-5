<template>
  <div id="container">

    <form class="pt-3" @submit.prevent="onSubmit">

      <div class="form-group">
        <label for="name">Имя</label>
        <input
          type="text"
          id="name"
          class="form-control"
          :class="{'is-invalid': $v.name.$error}"
          @blur="$v.name.$touch()"
          v-model="name"
        >
        <div class="invalid-feedback" v-if="!$v.name.minLength">
          Имя слишком короткое
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          :class="{'is-invalid': $v.email.$error}"
          @blur="$v.email.$touch()"
          v-model="email"
        >
        <div class="invalid-feedback" v-if="!$v.email.required">
          Поле Email обязательное
        </div>
        <div class="invalid-feedback" v-if="!$v.email.email">
          Это поле должно быть Email
        </div>
        <!--<div class="invalid-feedback" v-if="!$v.email.email.uniqEmail">-->
          <!--Этот Email уже используется-->
        <!--</div>-->
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          class="form-control"
          :class="{'is-invalid': $v.password.$error}"
          @blur="$v.password.$touch()"
          v-model="password"
        >
        <div class="invalid-feedback" v-if="!$v.password.minLength">
          Минимальная длина пароля {{ $v.password.$params.minLength.min }}. Сейчас {{ password.lenght }}
        </div>
      </div>

      <div class="form-group">
        <label for="confirm">Повторите пароль</label>
        <input
          type="password"
          id="confirm"
          class="form-control"
          :class="{'is-invalid': $v.confirmPassword.$error}"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
        >
        <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs">
          Пароли не совпадают
        </div>
      </div>

      <button
        class="btn btn-success"
        type="submit"
        :disabled="$v.$invalid"
      ><a href="/users" style="text-decoration: none; color: black">Submit</a></button>

    </form>
  </div>
</template>

<script>

  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        res: ''
      }
    },
    methods: {
      onSubmit () {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        let headers = {
          'Access-Control-Allow-Origin': '*'
        };

        this.$http.post('http://localhost:3000/addUser', user, headers)
          .then( response => {

          })
      }
    },
    validations: {
      name: {
        minLength: minLength(3)
      },
      email: {
        required,
        email,
        // uniqEmail: (newEmail) => new Promise(async (resolve, reject) => {
        //   this.$http.get('http://localhost:3000/addUser/'+newEmail).then( response => {
        //     resolve = response.body
        //   });
        //   console.log('----------result', resolve);
        //   return resolve
        // })
        // {
        //   this.$http.get('http://localhost:3000/addUser/'+newEmail).then( response => {
        //         this.res = response.body
        //       });
        //   console.log('----------result', this.res);
        //   return false
        // }
      },
      password: {
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
    }
  }

</script>
