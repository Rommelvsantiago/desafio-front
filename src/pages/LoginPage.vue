<template>
  <div class="row justify-center">
    <q-card class="my-card q-mt-xl" bordered>
      <q-form greed @submit="onSubmity">
        <q-card-section class="q-px-sm q-pt-sm q-pb-none">
          <q-card-section class="q-pa-none">
            <div class="text-center title-login q-py-lg">Quasar Notes</div>
          </q-card-section>

          <!-- EMAIL -->
          <q-card-section class="q-pb-none">
            <q-input
              v-model="form.email"
              dense
              color="grey-8"
              hint
              outlined
              no-error-icon
              :rules="[
                (val) => !!val || 'Preencha o campo',
                (val) => validateEmail(val) || 'E-mail inválido',
              ]"
              lazy-rules="ondemand"
              label="email"
            />
            <div class="row">
              <!-- PASSWORD -->
              <div class="col-12">
                <q-input
                  v-model="form.password"
                  dense
                  color="grey-8"
                  hint
                  outlined
                  bottom-slots
                  :type="visible ? 'text' : 'password'"
                  no-error-icon
                  :rules="[(val) => !!val || 'Preencha o campo']"
                  lazy-rules="ondemand"
                  label="Senha"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="visible ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="visible = !visible"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card-section>

        <!-- BUTTON -->
        <div class="row q-px-lg q-pt-sm q-pb-lg">
          <div class="col-12">
            <q-btn
              type="submit"
              class="full-width"
              color="primary"
              style=""
              rounded
              label="Entrar"
            />
          </div>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useGeneralStore } from "src/stores/store";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      form: { email: "", password: "" },
      visible: false,
      generalStore: null,
    };
  },
  mounted() {
    this.generalStore = useGeneralStore();
  },
  methods: {
    onSubmity() {
      this.generalStore.ActionLogin(this.form).then(() => {
        this.$router.push("/");
      });
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
  },
});
</script>

<style scoped>
.my-card {
  width: 350px;
  max-width: 350px;
}
.title-login {
  font-size: 2.5em;
  font-weight: bold;
  color: #333;
}
</style>
