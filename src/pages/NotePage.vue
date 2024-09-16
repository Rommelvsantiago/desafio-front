<template>
  <div v-if="newEdit" class="row q-pa-xl q-gutter-md">
    <div class="col-12">
      <q-card>
        <q-card-section>
          <q-input
            v-model="note.title"
            dense
            color="grey-8"
            hint
            outlined
            no-error-icon
            label="Título"
          />
          <q-input
            v-model="note.content"
            dense
            color="grey-8"
            hint
            outlined
            no-error-icon
            label="Conteúdo"
            type="textarea"
            autogrow
          />
          <q-select
            v-model="note.category_id"
            dense
            color="grey-8"
            hint
            outlined
            no-error-icon
            label="Categoria"
            :options="categories"
            option-value="id"
            option-label="title"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Salvar" @click="saveNote()" />
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
        <div class="col text-left title">Notas</div>
        <div class="col-auto">
          <q-btn
            flat
            color="primary"
            icon="add"
            label="Adicionar"
            @click="addNote()"
          />
        </div>
      </div>
    </div>
    <div class="col-12" v-for="(note, index) in notes" :key="index">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="col-auto self-center q-pa-sm">
              <span
                class="span-color"
                :style="'background:' + getColor(note.category_id)"
              ></span>
            </div>
            <div class="col self-center">
              <div class="row">
                <div class="col-12 title-note">
                  <strong>
                    {{ note.title }}
                  </strong>
                </div>
                <div class="col-12">{{ note.content }}</div>
                <div v-if="getNameCategory(note.category_id)" class="col-12">
                  Categoria:
                  {{ getNameCategory(note.category_id) }}
                </div>
              </div>
            </div>
            <div class="col-auto self-center">
              <q-btn
                flat
                color="primary"
                icon="edit"
                label="Editar"
                @click="editNote(note, index)"
              />
              <q-btn
                flat
                color="negative"
                icon="delete"
                label="Deletar"
                @click="deleteNote(note, index)"
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
const note = ref({ id: null, title: "", content: "", category_id: null });
const notes = ref([]);
const newEdit = ref(false);
const categories = ref([]);

onMounted(async () => {
  const res = await generalStore.ActionGetNotes();
  notes.value = res.data;

  const resCategories = await generalStore.ActionGetCategories();
  categories.value = resCategories.data;
});

const deleteNote = async (note, index) => {
  const res = await generalStore.ActionDeleteNotes(note.id);
  if (res.status === 200) {
    notes.value.splice(index, 1);
  }
};

const addNote = () => {
  newEdit.value = true;
};

const editNote = (nt, index) => {
  newEdit.value = true;
  note.value = { ...nt };
};

const getColor = (id) => {
  const category = categories.value.find((cat) => cat.id === id);

  if (!category) return "";

  return category.color;
};

const getNameCategory = (id) => {
  const category = categories.value.find((cat) => cat.id === id);

  if (!category) return "";

  return category.title;
};

const saveNote = async () => {
  if (note.value.id) {
    const res = await generalStore.ActionEditNotes(note.value);
    if (res.status === 200) {
      newEdit.value = false;
      note.value = { id: null, title: "", content: "", category_id: null };
      const res = await generalStore.ActionGetNotes();
      notes.value = res.data;
    }
  } else {
    const res = await generalStore.ActionCreateNotes(note.value);
    if (res.status === 200) {
      notes.value.unshift(res.data);
      newEdit.value = false;
      note.value = { id: null, title: "", content: "", category_id: null };
    }
  }
};
</script>

<style scoped>
.q-card {
  border: 1px solid #7e7e7e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.title-note {
  font-size: 1.5em;
}
.title {
  font-size: 22px;
  font-weight: 500;
  color: var(--q-primary);
}
.span-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
}
</style>
