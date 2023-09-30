import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  minify: false,
  sourcemap: true,
  dts: {
    compilerOptions: {
      allowSyntheticDefaultImports: true,
      jsx: "react",
      module: "NodeNext",
      moduleResolution: "nodenext",
    },
    resolve: true,
  },
});
