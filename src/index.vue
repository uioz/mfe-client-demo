<template>
  <div class="index">
    {{ message }} <router-link to="/home">Go Home</router-link>
    <p><img src="/static/vue3-dev-prototype/test.jpg" alt=""></p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      message: "hello world!",
    };
  },
});
</script>
