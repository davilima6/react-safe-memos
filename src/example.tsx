import React from "react";

import { safeUseMemo, safeUseCallback } from "./saferMemos";
import { MyComponent, MyMemoizedComponent } from "./saferMemos.test";

export default function App(): JSX.Element {
  const unsafeArr = [1, 2, 3];
  const unsafeCallback = (x: number) => x * 2;

  const safeArr = safeUseMemo(() => unsafeArr, []);
  const safeCallback = safeUseCallback(unsafeCallback, []);

  return (
    <>
      <MyComponent prop1="hey" prop2={unsafeArr} prop3={unsafeCallback} />
      <MyMemoizedComponent prop1="hey" prop2={safeArr} prop3={safeCallback} />
    </>
  );
}
