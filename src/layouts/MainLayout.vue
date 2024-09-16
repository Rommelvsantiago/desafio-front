<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="green">
      <q-toolbar class="green">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar Notes </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          Bem vindo, <strong>{{ generalStore?.user?.name }}</strong
          >!
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useGeneralStore } from "src/stores/store";

const linksList = [
  {
    title: "Notas",
    icon: "edit_note",
    link: "http://localhost:9000/#/notas",
  },
  {
    title: "Categorias",
    icon: "format_list_bulleted",
    link: "http://localhost:9000/#/categorias",
  },
];

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      generalStore: null,
    };
  },
  components: {
    EssentialLink,
  },
  mounted() {
    this.generalStore = useGeneralStore();
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
