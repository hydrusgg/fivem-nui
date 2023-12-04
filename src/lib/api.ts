import { bus } from "./events";

const w = window as any;

const RESOURCE_NAME = w.GetParentResourceName?.() ?? "hydrus";

export function post(name: string, payload = {}) {
  return fetch(`http://${RESOURCE_NAME}/${name}`, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export function callServer(name: string, ...args: any[]) {
  return post("RPC", { name, args });
}

bus.on("OPEN_URL", (url) => {
  w.invokeNative("openUrl", url);
});
