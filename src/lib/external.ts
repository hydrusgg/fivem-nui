import { resourceName } from "./state";

export function externalImage(src: string) {
  try {
    const url = new URL(src);

    if (url.protocol === "nui:") {
      url.protocol = "https:";
      url.host = `cfx-nui-${url.host}`;
      return url.toString();
    }

    if (url.host.endsWith("hydrus.gg")) {
      return url.toString();
    }

    if (!url.host.startsWith("cfx-nui")) {
      const proxy = new URL("https://external.jesteriruka.dev");
      const protocol = url.protocol.slice(0, -1);
      proxy.pathname = `${protocol}/${url.host}${url.pathname}${url.search}`;
      return proxy.toString();
    }

    url.protocol = "https:";

    return url.toString();
  } catch {
    const url = new URL(`https://cfx-nui-${resourceName}`);
    url.pathname = src;
    return url.toString();
  }
}
