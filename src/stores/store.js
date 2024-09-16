import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    user: null,
    notes: [],
    categories: [],
  }),
  actions: {
    setNotes(notes) {
      this.notes = notes;
    },
    setCategories(categories) {
      this.categories = categories;
    },
    setUser(user) {
      this.user = user;
    },

    // services notes
    async ActionGetNotes() {
      return new Promise(async (resolve, reject) => {
        const res = await api.get("notes");
        this.setNotes(res.data);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionDeleteNotes(id) {
      return new Promise(async (resolve, reject) => {
        const res = await api.delete(`notes/${id}`);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionEditNotes(payload) {
      return new Promise(async (resolve, reject) => {
        const res = await api.put(`notes/${payload.id}`, payload);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionCreateNotes(payload) {
      return new Promise(async (resolve, reject) => {
        const res = await api.post("notes", payload);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    // services categories
    async ActionGetCategories() {
      return new Promise(async (resolve, reject) => {
        const res = await api.get("categories");
        this.setCategories(res.data);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionDeleteCategories(id) {
      return new Promise(async (resolve, reject) => {
        const res = await api.delete(`categories/${id}`);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionEditCategories(payload) {
      return new Promise(async (resolve, reject) => {
        const res = await api.put(`categories/${payload.id}`, payload);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionCreateCategories(payload) {
      return new Promise(async (resolve, reject) => {
        const res = await api.post("categories", payload);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    },

    async ActionLogin(payload) {
      return new Promise(async (resolve, reject) => {
        await api
          .post("auth/login", payload)
          .then((res) => {
            api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;

            localStorage.setItem("token_time_expire", res.data.expires_in);
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem(
              "date_time_moment_login",
              new Date().toLocaleString()
            );

            this.setUser(res.data.user);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },

    async ActionMe() {
      console.log("TESTE");

      return new Promise(async (resolve, reject) => {
        api.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;

        await api
          .get("auth/me")
          .then((res) => {
            localStorage.setItem("token_time_expire", res.data.expires_in);
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem(
              "date_time_moment_login",
              new Date().toLocaleString()
            );

            this.setUser(res.data.user);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
});
