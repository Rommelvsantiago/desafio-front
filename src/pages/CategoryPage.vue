<template>
  <div v-if="newEdit" class="row q-pa-xl q-gutter-md">
    <div class="col-12">
      <q-card>
        <q-card-section>
          <q-input
            v-model="category.title"
            dense
            color="grey-8"
            hint
            outlined
            no-error-icon
            label="Título"
          />
          <q-input
            dense
            outlined
            no-error-icon
            color="grey-8"
            label="Cor"
            v-model="category.color"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="category.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Salvar" @click="saveCategory()" />
          <q-btn
            flat
            color="negative"
            label="Cancelar"
            @click="newEdit = false"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <div v-else class="row q-pa-xl q-gutter-md">
    <div class="col-12 text-right q-pb-md">
      <div class="row">
        <div class="col text-left title">Categorias</div>
        <div class="col-auto">
          <q-btn
            flat
            color="primary"
            icon="add"
            label="Adicionar"
            @click="addCategory()"
          />
        </div>
      </div>
    </div>
    <div class="col-12" v-for="(category, index) in categories" :key="index">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="col-auto self-center q-pa-sm">
              <span
                class="span-color"
                :style="'background:' + category.color"
              ></span>
            </div>
            <div class="col self-center">
              <div class="row">
                <div class="col-12 title-category">
                  <strong>
                    {{ category.title }}
                  </strong>
                </div>
              </div>
            </div>
            <div class="col-auto self-center">
              <q-btn
                flat
                color="primary"
                icon="edit"
                label="Editar"
                @click="editCategory(category, index)"
              />
              <q-btn
                flat
                color="negative"
                icon="delete"
                label="Deletar"
                @click="deleteCategory(category, index)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGeneralStore } from "src/stores/store";

const generalStore = useGeneralStore();
const category = ref({ id: null, title: "", content: "" });
const categories = ref([]);
const newEdit = ref(false);

onMounted(async () => {
  const res = await generalStore.ActionGetCategories();
  categories.value = res.data;
});

const deleteCategory = async (category, index) => {
  const res = await generalStore.ActionDeleteCategories(category.id);
  if (res.status === 200) {
    categories.value.splice(index, 1);
  }
};

const addCategory = () => {
  newEdit.value = true;
};

const editCategory = (nt, index) => {
  newEdit.value = true;
  category.value = { ...nt };
};

const saveCategory = async () => {
  if (category.value.id) {
    const res = await generalStore.ActionEditCategories(category.value);
    if (res.status === 200) {
      newEdit.value = false;
      category.value = { id: null, title: "", color: "" };
      const res = await generalStore.ActionGetCategories();
      categories.value = res.data;
    }
  } else {
    const res = await generalStore.ActionCreateCategories(category.value);
    if (res.status === 200) {
      categories.value.unshift(res.data);
      newEdit.value = false;
      category.value = { id: null, title: "", color: "" };
    }
  }
};
</script>

<style scoped>
.q-card {
  border: 1px solid #7e7e7e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.title-category {
  font-size: 1.5em;
}
.span-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
}
.title {
  font-size: 22px;
  font-weight: 500;
  color: var(--q-primary);
}
</style>
