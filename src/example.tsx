import React from "react";

import { memo, useCallback, useMemo } from "./wrappers";

type ExampleProps = {
  prop1: string;
  prop2: number[];
  prop3: (x: number) => number;
  prop4: React.CSSProperties;
};

function App(): JSX.Element {
  const unsafeArr = [1, 2, 3];
  const unsafeCallback = (x: number) => x * 2;
  const unsafeStyle = {};
  return (
    <Page
      prop1="hey"
      prop2={unsafeArr}
      prop3={unsafeCallback}
      prop4={unsafeStyle}
    />
  );
}

function Page(props: ExampleProps): JSX.Element {
  const { prop1, prop2: unsafeArr, prop3: unsafeCallback } = props;
  const safeArr = useMemo(() => unsafeArr, [unsafeArr]);
  const safeCallback = useCallback(unsafeCallback, [unsafeCallback]);
  const unsafeStyle: React.CSSProperties = { textAlign: "center" };
  const safeStyle = useMemo(() => unsafeStyle, []);
  return (
    <>
      <MyComponent
        prop1={prop1}
        prop2={unsafeArr}
        prop3={unsafeCallback}
        prop4={unsafeStyle}
      />
      <MyMemoizedComponent
        prop1={prop1}
        prop2={safeArr}
        prop3={safeCallback}
        prop4={safeStyle}
      />
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

const MyMemoizedComponent = memo(MyComponent);

export { ExampleProps, MyComponent, MyMemoizedComponent, App as default };
