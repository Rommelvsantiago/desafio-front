<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon class="icon q-pa-xs" size="md" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="title">{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.title {
  font-size: 22px;
  font-weight: 500;
  color: var(--q-primary);
}
.icon {
  background: var(--q-primary);
  color: white;
  border-radius: 8px;
}
</style>
