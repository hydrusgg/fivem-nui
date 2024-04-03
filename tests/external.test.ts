globalThis.window = {
  GetParentResourceName: () => "hydrus",
} as any;

import { describe, test, expect } from "bun:test";
const { externalImage } = require("../src/lib/external.ts");

describe("External Image", () => {
  test("External image to imgur", () => {
    const src = "https://i.imgur.com/NeRqqGu.jpeg";

    expect(externalImage(src)).toEqual(
      "https://external.jesteriruka.dev/https/i.imgur.com/NeRqqGu.jpeg"
    );
  });

  test("External image to http", () => {
    const src = "http://189.127.164.119/carros/2f2fgts.png";

    expect(externalImage(src)).toEqual(
      "https://external.jesteriruka.dev/http/189.127.164.119/carros/2f2fgts.png"
    );
  });

  test("External image to current-script", () => {
    expect(externalImage("image.png")).toEqual(
      "https://cfx-nui-hydrus/image.png"
    );
  });

  test("External image to local-script", () => {
    const src = "nui://teste/image.png";
    expect(externalImage(src)).toEqual("https://cfx-nui-teste/image.png");
  });

  test("External image to local-script", () => {
    const src = "https://cfx-nui-teste/image.png";
    expect(externalImage(src)).toEqual(src);
  });

  test("External image to local-script", () => {
    const src = "http://cfx-nui-teste/image.png";
    expect(externalImage(src)).toEqual("https://cfx-nui-teste/image.png");
  });
});
