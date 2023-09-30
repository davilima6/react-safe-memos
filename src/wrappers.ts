import React from "react";

import type { Memoized, MemoizedComponent } from "./types";

function useSafeCallback<T extends Function>(
  callback: T,
  deps: React.DependencyList
): Memoized<T> {
  return React.useCallback(callback, deps) as Memoized<T>;
}

function useSafeMemo<T>(
  factory: () => T,
  deps: React.DependencyList | undefined
): Memoized<T> {
  return React.useMemo(factory, deps) as Memoized<T>;
}

// TODO: implement React.memo's type overload (NamedExoticComponent and MemoExoticComponent)
function safeReactMemo<T extends React.ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>
  ) => boolean
): MemoizedComponent<T> {
  return React.memo(
    Component,
    propsAreEqual
  ) as unknown as MemoizedComponent<T>;
}

export { safeReactMemo, useSafeCallback, useSafeMemo };
