import { writable } from "svelte/store";
import { bus } from "./events";
import type { Credit, Popup } from "./types";
import { post } from "./api";

export const resourceName = (window as any).GetParentResourceName?.();
export const isBrowser = resourceName == null;
export const visible = writable(isBrowser);
export const popups = writable<Popup[]>([]);
export const overlay = writable(false);
export const credits = writable<Credit[]>([]);
export const iframe = writable("");

function createStackTimer() {
  popups.update((prev) => {
    if (prev.length > 1) {
      setTimeout(createStackTimer, 5_000);
    }
    return prev.slice(1);
  });
}

bus.on("POPUP", (data) => {
  if (!data || !data.name || !data.image) {
    return;
  }

  popups.update((previous) => {
    if (previous.length === 0) {
      setTimeout(createStackTimer, 5_000);
    }

    return previous.concat(data);
  });
});

bus.on("OVERLAY", ({ visible }) => {
  overlay.set(visible);
});

bus.on("IFRAME", (url) => {
  iframe.set(url);
});

bus.on("OPEN", (all) => {
  visible.set(true);
  credits.set(all);
});

window.onkeydown = (event) => {
  if (event.key === "Escape") {
    iframe.set("");
    visible.set(false);
    post("CLOSE");
  }
};

if (isBrowser) {
  Object.assign(window, { bus });

  bus.emit("OPEN", [
    {
      name: "Credit Name",
      image: "https://cdn.jesteriruka.dev/imagens/sultan2.png",
    },
  ]);
}
