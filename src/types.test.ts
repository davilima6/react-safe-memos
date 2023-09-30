import type { Equal, Expect } from "@type-challenges/utils";
import React from "react";

import { MyMemoizedComponent } from "./example";
import type { Memoized } from "./types";
import { useCallback, useMemo } from "./wrappers";

const memoArray = useMemo(() => [1, 2, 3], []);
const memoCallback = useCallback((x: number) => x * 2, []);

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
        prop4: Memoized<React.CSSProperties>;
      }
    >
  >
];
