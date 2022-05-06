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
        @blur="v$.firstname.$touch()"
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
        @blur="v$.lastname.$touch()"
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
        @blur="v$.email.$touch()"
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
        @blur="v$.phone.$touch()"
      />
      <base-error v-if="v$.phone.$error">{{
        v$.phone.$errors[0].$message
      }}</base-error>
    </div>
    <div class="form-group c6">
      <label for="password">Password</label>
      <input
        :class="{ 'error-border': v$.password.$error }"
        id="password"
        :type="visibility"
        v-model="state.password"
        @blur="v$.password.$touch()"
      />
      <a
        class="password-eye"
        @click="showPassword"
        v-if="visibility == 'password'"
      >
        <img src="../../assets/icons/crossed-out-eye.svg" alt="Eye" />
      </a>
      <a class="password-eye" @click="hidePassword" v-if="visibility == 'text'">
        <img src="../../assets/icons/eye.svg" alt="Crossed out eye" />
      </a>
      <base-error v-if="v$.password.$error">{{
        v$.password.$errors[0].$message
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
  and,
  requiredUnless,
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
      password: "",
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
    // Паттерн с символами (а-я, А-Я, a-z, A-Z)
    const alpha = helpers.regex(/^[A-Za-zА-Яа-яЁё]+$/);
    const passNum = helpers.regex(/[0-9]{2,20}/);
    const passAlphaLat = helpers.regex(/[A-Za-z]/);
    const passCyr = helpers.regex(/^[^А-Яа-яЁё]+$/);
    const passSym = helpers.regex(/[!@#$%^&*]{1,20}/);

    // Правила для валидации
    const rules = computed(() => {
      return {
        firstname: {
          required,
          alpha: helpers.withMessage("Only Cyrillic and Latin", alpha),
          minLength: minLength(2),
        },
        lastname: {
          required,
          alpha: helpers.withMessage("Only Cyrillic and Latin", alpha),
          minLength: minLength(2),
        },
        email: {
          required: helpers.withMessage(
            "Fill in the phone or email field",
            requiredUnless(state.phone)
          ),
          email,
        },
        phone: {
          required: helpers.withMessage(
            "Fill in the phone or email field",
            requiredUnless(state.email)
          ),
          maxLength: maxLength(15),
        },
        password: {
          required,
          minLength: minLength(8),
          shouldBeChecked: helpers.withMessage(
            "Passwords must contain at least 2 digits, 1 special character and only Latin",
            and(passNum, passAlphaLat, passCyr, passSym)
          ),
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

    let visibility = ref("password");
    // Показать пароль
    function showPassword() {
      visibility.value = "text";
    }
    // Скрыть пароль
    function hidePassword() {
      visibility.value = "password";
    }

    return {
      formValid,
      submitForm,
      state,
      v$,
      countries,
      visibility,
      showPassword,
      hidePassword,
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

.password-eye {
  position: absolute;
  right: 10px;
  top: 35px;
}
.password-eye img {
  width: 25px;
  cursor: pointer;
}
</style>
