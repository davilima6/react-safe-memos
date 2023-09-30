import type { Equal, Expect } from "@type-challenges/utils";
import React from "react";

import { MyMemoizedComponent } from "./example";
import type { Memoized } from "./helpers";
import { safeUseCallback, safeUseMemo } from "./saferMemos";

const memoArray = safeUseMemo(() => [1, 2, 3], []);
const memoCallback = safeUseCallback((x: number) => x * 2, []);

type cases = [
  Expect<Equal<typeof memoArray, Memoized<number[]>>>,
  Expect<Equal<typeof memoCallback, Memoized<(x: number) => number>>>,
  Expect<
    Equal<
      React.ComponentPropsWithRef<typeof MyMemoizedComponent>,
      {
        prop1: string;
        prop2: Memoized<number[]>;
        prop3: Memoized<(x: number) => number>;
      }
    >
  >
];
