function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

if (
  getCookie("userName") === undefined &&
  window.location.pathname !== "/login"
) {
  window.location.replace("/login");
}

export default async ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (to.name !== "login" && app.$cookies.get("userName") === undefined)
      next({ name: "login" });
    else {
      next();
    }
  });
};
