import { registerApplication, start } from "single-spa";

const mfeApps = [
  {
    name: '@mfe/sidebar',
    activeWhen: location => location.pathname.startsWith('/'),
    domElement: 'sidebar' 
  },
  {
    name: '@mfe/topbar',
    activeWhen: location => location.pathname.startsWith('/'),
    domElement: 'topbar'
  },
  {
    name: '@mfe/dashboard',
    activeWhen: location => location.pathname.startsWith('/dashboard'),
    domElement: 'main'
  }
]

for (const { name, activeWhen, domElement } of mfeApps) {
  registerApplication(
    name,
    async () => {
      const module = await System.import(name);
      if (!module.bootstrap || !module.mount || !module.unmount) {
        throw new Error(`Module for ${name} does not export expected lifecycle functions.`);
      }
      return {
        bootstrap: module.bootstrap,
        mount: module.mount,
        unmount: module.unmount,
      };
    },
    activeWhen,
    { domElement: document.getElementById(domElement) }
  );
}

// registerApplication({
//   name: "@mfe/sidebar",
//   app: () => System.import<LifeCycles>("@mfe/sidebar"),
//   activeWhen: ["/"] 
// });

// registerApplication({
//   name: "@mfe/topbar",
//   app: () => System.import<LifeCycles>("@mfe/topbar"),
//   activeWhen: ["/"] 
// });

start({
  urlRerouteOnly: true,
});
