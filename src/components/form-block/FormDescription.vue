<template>
  <div class="description-block">
    <h2 class="description-title">Форма регистрации пользователя на сайте</h2>
    <ol>
      <li>
        Поля:
        <ul>
          <li>Name</li>
          <li>Lastname</li>
          <li>Email</li>
          <li>Phone</li>
          <li>Password</li>
          <li>Confirm password</li>
          <li>
            Country - Выпадающий список стран. Название страны написано на языке
            страны
          </li>
        </ul>
      </li>
      <li>
        Чекбоксы:
        <ul>
          <li>Agree that managers can contact me</li>
          <li>News subscription</li>
        </ul>
      </li>
      <li>
        Кнопка:
        <ul>
          <li>Registr</li>
        </ul>
      </li>
      <li>
        Валидация полей:
        <ul>
          <li>Name, lastname: символы за исключением спецсимволов</li>
          <li>Email: валидный адрес почты</li>
          <li>Phone: не более 11 цифр</li>
          <li>
            Password, confirm password: минимум 8 символов, 2 из них цифры, 1
            спецсимвол, только латиница
          </li>
        </ul>
      </li>
      <li>
        Расположение полей:
        <ul>
          <li>Name, lastname - на одной строке</li>
          <li>Email, phone - на одной строке</li>
          <li>Password, confirm password - на одной строке</li>
          <li>Country - на одной строке</li>
          <li>Agree that managers can contact me - на одной строке</li>
          <li>News subscription - на одной строке</li>
        </ul>
      </li>
      <li>
        Использовал:
        <ul>
          <li>
            Валидация:
            <a target="_blank" href="https://vuelidate-next.netlify.app"
              >Vuelidate</a
            >
          </li>
          <li>
            Маска ввода:
            <a target="_blank" href="https://github.com/vuejs-tips/vue-the-mask"
              >vue-the-mask</a
            >
          </li>
          <li>
            Получение информации о странах:
            <a
              target="_blank"
              href="https://restcountries.com/#api-endpoints-v2-all"
              >REST Countries API</a
            >
          </li>
          <li>
            Запросы: <a target="_blank" href="https://axios-http.com">Axios</a>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.description-block {
  max-width: 700px;
}
.description-title {
  padding-bottom: 15px;
  text-align: center;
}
ul {
  padding-bottom: 5px;
}
</style>
