import { registerApplication, start, LifeCycles } from "single-spa";

// registerApplication({
//   name: "@mfe/navbar",
//   app: () => System.import<LifeCycles>("@mfe/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
