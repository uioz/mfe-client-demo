<template>
  <div class="home">
    {{ message }} <router-link to="/">Go Index</router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      message: "home",
    };
  },
});
</script>
