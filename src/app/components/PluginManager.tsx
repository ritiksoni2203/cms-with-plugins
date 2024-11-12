'use client';

import { getPlugins } from "../lib/plugins";

export default function PluginManager() {
  const plugins = getPlugins();

  return (
    <div>
      {plugins.map((plugin) => (
        <div key={plugin.id}>{plugin.render()}</div>
      ))}
    </div>
  );
}
