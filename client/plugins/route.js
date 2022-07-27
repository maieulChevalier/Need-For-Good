console.log("location: ", window.location.pathname);
if (
  localStorage.getItem("userName") === null &&
  window.location.pathname !== "/login"
) {
  window.location.replace("/login");
}

// export default async ({ app }) => {
//   // Every time the route changes (fired on initialization too)
//   // const isMounted = await app.mounted()
//   console.log("app: ", app);
//   app.router.beforeEach((to, from, next) => {
//     if (to.name !== "login" && localStorage.getItem("userName") === null)
//       next({ name: "login" });
//     else {
//       console.log("helloooo");
//       next();
//     }
//   });
// };
