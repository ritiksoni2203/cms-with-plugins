export interface Plugin {
  id: string;
  name: string;
  render: () => JSX.Element;
}

const plugins: Plugin[] = [];

export function registerPlugin(plugin: Plugin) {
  plugins.push(plugin);
}

export function getPlugins() {
  return plugins;
}
