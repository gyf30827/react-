import connect from './components/connect.tsx'
export type {
  Connect,
  ConnectProps,
  ConnectedProps,
} from './components/connect.tsx'

import shallowEqual from './utils/shallowEqual.ts'

import Provider from './components/Provider.tsx'
import { defaultNoopBatch } from './utils/batch.ts'

export { ReactReduxContext } from './components/Context.ts'
export type { ReactReduxContextValue } from './components/Context.ts'

export type { ProviderProps } from './components/Provider.tsx'

export type {
  MapDispatchToProps,
  MapDispatchToPropsFactory,
  MapDispatchToPropsFunction,
  MapDispatchToPropsNonObject,
  MapDispatchToPropsParam,
  MapStateToProps,
  MapStateToPropsFactory,
  MapStateToPropsParam,
  MergeProps,
  Selector,
  SelectorFactory,
} from './connect/selectorFactory'

export { createDispatchHook, useDispatch } from './hooks/useDispatch.ts'
export type { UseDispatch } from './hooks/useDispatch.ts'

export { createSelectorHook, useSelector } from './hooks/useSelector.ts'
export type { UseSelector } from './hooks/useSelector.ts'

export { createStoreHook, useStore } from './hooks/useStore.ts'
export type { UseStore } from './hooks/useStore.ts'

export type { Subscription } from './utils/Subscription.ts'

export * from './types.ts'

/**
 * @deprecated As of React 18, batching is enabled by default for ReactDOM and React Native.
 * This is now a no-op that immediately runs the callback.
 */
const batch = defaultNoopBatch

export { Provider, batch, connect, shallowEqual }
