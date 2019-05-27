<template>
  <div id="container">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Краснодар</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Главная</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/users">Пользователи</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-outline-dark my-2 my-sm-0 mr-1" type="submit"><a href="/login">Вход</a></button>
          <button class="btn btn-outline-dark my-2 my-sm-0" type="submit"><a href="/registration">Регистрация</a></button>
        </form>
      </div>
    </nav>

    <router-view></router-view>

  </div>
</template>

<script>

  export default {

  }
</script>

<style>
  body {
    background: linear-gradient(45deg, #EECFBA, #C5DDE8);
  }
</style>
