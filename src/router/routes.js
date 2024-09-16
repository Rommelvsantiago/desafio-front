const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/NotePage.vue") },
      { path: "notas", component: () => import("pages/NotePage.vue") },
      { path: "categorias", component: () => import("pages/CategoryPage.vue") },
    ],
    beforeEnter: (to, from, next) => {
      let date_time_moment_login = localStorage.getItem(
        "date_time_moment_login"
      );
      const dateNow = new Date();
      let dateBeforeString = new Date(
        dateNow.getTime() - localStorage.getItem("token_time_expire") * 1000
      ).toLocaleString();

      if (date_time_moment_login)
        date_time_moment_login = date_time_moment_login.replace(
          /(\d{2})\/(\d{2})\/(\d{4})/,
          "$3-$2-$1"
        );

      dateBeforeString = dateBeforeString.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3-$2-$1"
      );

      if (date_time_moment_login && date_time_moment_login > dateBeforeString) {
        next();
      } else {
        next("entrar");
      }
    },
  },
  {
    path: "/",
    component: () => import("layouts/WhiteLayout.vue"),
    children: [
      { path: "entrar", component: () => import("pages/LoginPage.vue") },
    ],
    beforeEnter: (to, from, next) => {
      let date_time_moment_login = localStorage.getItem(
        "date_time_moment_login"
      );
      const dateNow = new Date();
      let dateBeforeString = new Date(
        dateNow.getTime() - localStorage.getItem("token_time_expire") * 1000
      ).toLocaleString();

      if (date_time_moment_login)
        date_time_moment_login = date_time_moment_login.replace(
          /(\d{2})\/(\d{2})\/(\d{4})/,
          "$3-$2-$1"
        );

      dateBeforeString = dateBeforeString.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3-$2-$1"
      );

      if (date_time_moment_login && date_time_moment_login > dateBeforeString) {
        next("");
      } else {
        next();
      }
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
