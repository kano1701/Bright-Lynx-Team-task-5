<template>

  <div class="container">

    <h1 class="mt-3 ml-5"> Пользователи </h1>

    <ul>
      <li class="mt-3" v-for="user in listUser">
        <div class="card">
          <div class="card-header">
            Карточка пользователя № {{ user.id }}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ user.name }}</p>
              <footer class="blockquote-footer">Email <cite title="Source Title"> {{ user.email }} </cite></footer>
            </blockquote>
          </div>
        </div>
      </li>
    </ul>

  </div>

</template>

<script>

  export default {
    data () {
      return {
        listUser: []
      }
    },
    methods: {
      getUsers: function () {
        this.$http.get('http://localhost:3000/users').then(function (response) {
          console.log(response.data);
          this.listUser = response.data['body'];
        }, function (response) {
          console.log(response)
        });
      }
    },
    beforeMount(){
      this.getUsers()
    },
  }
</script>

<style scoped>
  li {
    list-style-type: none;
  }
</style>
