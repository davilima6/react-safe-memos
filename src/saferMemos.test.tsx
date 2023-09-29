import type { Equal, Expect } from "@type-challenges/utils";
import React, { JSX } from "react";

import type { Memoized } from "./helpers";
import { safeReactMemo, safeUseCallback, safeUseMemo } from "./saferMemos";

type Props = {
  prop1: string;
  prop2: number[];
  prop3: (x: number) => number;
};

function MyComponent(props: Props): JSX.Element {
  const { prop1, prop2, prop3 } = props;
  const result = prop3(10);

  return (
    <>
      <h1>An example component</h1>
      <ul>
        {prop2.map(item => <li>{item}</li>)}
      </ul>
      <p><strong>Result:</strong> {result}</p>
    </>
  );
}

const MyMemoizedComponent = safeReactMemo(MyComponent);

const memoArray = safeUseMemo(() => [1, 2, 3], []);
const memoCallback = safeUseCallback((x: number) => x * 2, []);

type cases = [
  Expect<Equal<typeof memoArray, Memoized<number[]>>>,
  Expect<Equal<typeof memoCallback, Memoized<(x: number) => number>>>,
  Expect<
    Equal<
      React.ComponentProps<typeof MyMemoizedComponent>,
      {
        prop1: string;
        prop2: Memoized<number[]>;
        prop3: Memoized<(x: number) => number>;
      }
    >
  >
];

export { MyComponent, MyMemoizedComponent };
