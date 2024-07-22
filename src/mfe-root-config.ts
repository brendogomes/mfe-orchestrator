import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@mfe/sidebar",
  app: () => System.import<LifeCycles>("@mfe/sidebar"),
  activeWhen: ["/"] 
});

start({
  urlRerouteOnly: true,
});
