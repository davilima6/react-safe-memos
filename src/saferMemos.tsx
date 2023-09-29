import React, { JSX } from "react";

import type { Memoized, Primitive } from "./helpers";

// NON-PRIMITIVE PROPS MEMOIZER
type NonPrimitivesMemoized<T> = {
  [K in keyof T]: T[K] extends Primitive ? T[K] : Memoized<T[K]>;
};

type MemoizedComponent<C extends React.ComponentType<any>> = (
  component: NonPrimitivesMemoized<React.ComponentProps<C>>
) => JSX.Element;

// REACT WRAPPERS
function safeUseCallback<T extends (...args: any) => any>(
  callback: T,
  deps: React.DependencyList
): Memoized<T> {
  return React.useCallback(callback, deps) as Memoized<T>;
}

function safeUseMemo<T>(
  factory: () => T,
  deps?: React.DependencyList
): Memoized<T> {
  return React.useMemo(factory, deps) as Memoized<T>;
}

// TODO: implement support for propsAreEqual & nextProps
function safeReactMemo<T extends React.ComponentType<any>>(
  component: T
): MemoizedComponent<T> {
  return React.memo(component) as unknown as MemoizedComponent<T>;
}

export { safeReactMemo, safeUseCallback, safeUseMemo };
