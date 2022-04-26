import { createApp } from "vue";
import App from "./App.vue";
import BaseError from "./components/base/BaseError.vue";
import BaseButton from "./components/base/BaseButton.vue";

import VueTheMask from "vue-the-mask";

const app = createApp(App);

app.component("BaseError", BaseError);
app.component("BaseButton", BaseButton);
app.use(VueTheMask);

app.mount("#app");
