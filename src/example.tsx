import React from "react";

import { safeReactMemo, safeUseCallback, safeUseMemo } from "./saferMemos";

type ExampleProps = {
  prop1: string;
  prop2: number[];
  prop3: (x: number) => number;
};

function App(): JSX.Element {
  const unsafeArr = [1, 2, 3];
  const unsafeCallback = (x: number) => x * 2;
  return <Page prop1="hey" prop2={unsafeArr} prop3={unsafeCallback} />;
}

function Page(props: ExampleProps): JSX.Element {
  const { prop1, prop2: unsafeArr, prop3: unsafeCallback } = props;
  const safeArr = safeUseMemo(() => unsafeArr, [unsafeArr]);
  const safeCallback = safeUseCallback(unsafeCallback, [unsafeCallback]);
  return (
    <>
      <MyComponent prop1={prop1} prop2={unsafeArr} prop3={unsafeCallback} />
      <MyMemoizedComponent prop1={prop1} prop2={safeArr} prop3={safeCallback} />
    </>
  );
}

function MyComponent(props: ExampleProps): JSX.Element {
  const { prop2: arr, prop3: fn } = props;
  const result = fn(10);
  return (
    <>
      <h1>An example component</h1>
      <ul>{arr.map((item) => (<li key={new Date().toString()}>{item}</li>))}</ul>
      <p><strong>Result:</strong> {result}</p>
    </>
  );
}

const MyMemoizedComponent = safeReactMemo(MyComponent);

export { ExampleProps, MyComponent, MyMemoizedComponent, App as default };
