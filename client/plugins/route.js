console.log("location: ", window.location.pathname);
if (
  localStorage.getItem("userName") === null &&
  window.location.pathname !== "/login"
) {
  window.location.replace("/login");
}

export default async ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (to.name !== "login" && localStorage.getItem("userName") === null)
      next({ name: "login" });
    else {
      next();
    }
  });
};
