<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useGeneralStore } from "src/stores/store";

const generalStore = useGeneralStore();

onMounted(() => {
  generalStore.ActionMe();
});

defineOptions({
  name: 'App'
});
</script>
