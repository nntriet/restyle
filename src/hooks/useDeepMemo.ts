import React from 'react';
import isEqual from 'react-fast-compare';

export function useDeepMemoize(value: React.DependencyList) {
  const ref = React.useRef<React.DependencyList>([]);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

/**
 * `useDeepMemo` will only recompute the memoized value when one of the
 * `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useMemo.
 *
 */
function useDeepMemo<T>(factory: () => T, dependencies: React.DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(factory, useDeepMemoize(dependencies));
}

export default useDeepMemo;
