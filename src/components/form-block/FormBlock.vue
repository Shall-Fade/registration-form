<template>
  <form class="form-block" @submit.prevent="submitForm">
    <div class="c6">
      <h2 class="form-title">Registration</h2>
    </div>
    <div class="form-group c3">
      <label for="firstname">First name</label>
      <input
        :class="{ 'error-border': v$.firstname.$error }"
        id="firstname"
        type="text"
        v-model="state.firstname"
      />
      <base-error v-if="v$.firstname.$error">{{
        v$.firstname.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c3">
      <label for="lastname">Last name</label>
      <input
        :class="{ 'error-border': v$.lastname.$error }"
        id="lastname"
        type="text"
        v-model="state.lastname"
      />
      <base-error v-if="v$.lastname.$error">{{
        v$.lastname.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c3">
      <label for="email">E-mail</label>
      <input
        :class="{ 'error-border': v$.email.$error }"
        id="email"
        type="text"
        v-model="state.email"
      />
      <base-error v-if="v$.email.$error">{{
        v$.email.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c3">
      <label for="phone">Phone</label>
      <input
        :class="{ 'error-border': v$.phone.$error }"
        id="phone"
        type="text"
        v-model="state.phone"
        v-mask="'#(###)###-##-##'"
      />
      <base-error v-if="v$.phone.$error">{{
        v$.phone.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c3">
      <label for="password">Password</label>
      <input
        :class="{ 'error-border': v$.password.password.$error }"
        id="password"
        type="text"
        v-model="state.password.password"
      />
      <base-error v-if="v$.password.password.$error">{{
        v$.password.password.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c3">
      <label for="confirm">Confirm Password</label>
      <input
        :class="{ 'error-border': v$.password.confirm.$error }"
        id="confirm"
        type="text"
        v-model="state.password.confirm"
      />
      <base-error v-if="v$.password.confirm.$error">{{
        v$.password.confirm.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c6">
      <label for="country">Country</label>
      <select name="" id="country">
        <option value=""></option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </div>
    <div class="form-group form-checkbox c6">
      <input id="contact" type="checkbox" />
      <label for="contact">Agree that managers can contact me</label>
    </div>
    <div class="form-group form-checkbox c6">
      <input id="news" type="checkbox" />
      <label for="news">News subscription</label>
    </div>
    <base-button type="submit">Registr</base-button>
  </form>
</template>

<script>
import { computed, ref, reactive, onMounted } from "vue";
import useValidate from "@vuelidate/core";
import axios from "axios";
import {
  helpers,
  required,
  email,
  sameAs,
  and,
  minLength,
  maxLength,
} from "@vuelidate/validators";

export default {
  setup() {
    // Массив стран
    let countriesList = ref([]);
    // Сортировка стран по алфавиту
    let countries = countriesList.value.sort();

    const state = reactive({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: {
        password: "",
        confirm: "",
      },
    });

    // Запрос к REST Countries API
    onMounted(() => {
      axios.get("https://restcountries.com/v2/all").then((responce) => {
        responce.data.forEach((item) => {
          countriesList.value.push(item.nativeName);
        });
      });
    });

    // Паттерны
    // Паттерн с символами (0-9, а-я, А-Я, a-z, A-Z)
    const alphaNum = helpers.regex(/^[A-Za-zА-Яа-яЁё0-9]+$/);
    const passNum = helpers.regex(/[0-9]{2,20}/);
    const passAlphaLat = helpers.regex(/[A-Za-z]/);
    const passCyr = helpers.regex(/^[^А-Яа-яЁё]+$/);
    const passSym = helpers.regex(/[!@#$%^&*]{1,20}/);

    // Правила для валидации
    const rules = computed(() => {
      return {
        firstname: {
          required,
          alphaNum: helpers.withMessage(
            "Only Cyrillic, Latin and numbers",
            alphaNum
          ),
          minLength: minLength(2),
        },
        lastname: {
          required,
          alphaNum: helpers.withMessage(
            "Only Cyrillic, Latin and numbers",
            alphaNum
          ),
          minLength: minLength(2),
        },
        email: { required, email },
        phone: { required, maxLength: maxLength(15) },
        password: {
          password: {
            required,
            minLength: minLength(8),
            shouldBeChecked: helpers.withMessage(
              "Passwords must contain at least 2 digits, 1 special character and only Latin",
              and(passNum, passAlphaLat, passCyr, passSym)
            ),
          },
          confirm: {
            required,
            sameAs: sameAs(state.password.password),
          },
        },
      };
    });

    // Проверка формы на валидность
    const formValid = computed(() => {
      return v$.value.$invalid;
    });

    const v$ = useValidate(rules, state);

    function submitForm() {
      v$.value.$validate();
      if (!v$.value.$error) {
        alert("Form is valid!");
      } else {
        alert("Form is not valid!");
      }
    }

    return {
      formValid,
      submitForm,
      state,
      v$,
      countries,
    };
  },
};
</script>

<style scoped>
.form-block {
  background-color: #fff;
  padding: 25px;
  max-width: 540px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
}

.form-title {
  padding-bottom: 20px;
}

input {
  outline: none;
  background: none;
  border: none;

  width: 100%;
  border: 1px solid #000;
  font-size: 18px;
  padding: 10px 15px;
}

select {
  width: 100%;
  padding: 10px;
  cursor: pointer;
}

label {
  display: block;
  padding-bottom: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

/* Половина строки */
.c3 {
  width: calc(100% / 2 - 12.5px);
}

/* Полная строка */
.c6 {
  width: 100%;
}

.form-group {
  padding-bottom: 15px;
}

.form-checkbox {
  display: flex;
  align-items: center;
}
.form-checkbox label {
  padding: 0;
  cursor: pointer;
}
.form-checkbox input {
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
}
.form-checkbox input[type="checkbox"]:checked + label {
  color: #437ae0;
}

.error-border {
  transition: 0.3s ease;
  border: 1px solid red;
}
</style>
