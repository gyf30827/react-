// The primary entry point assumes we are working with React 18, and thus have
// useSyncExternalStore available. We can import that directly from React itself.
// The useSyncExternalStoreWithSelector has to be imported, but we can use the
// non-shim version. This shaves off the byte size of the shim.

import * as React from 'react'
import * as mm from 'use-sync-external-store/shim/with-selector'

import { initializeUseSelector } from './hooks/useSelector.ts'
import * as connect from './components/connect.tsx'

console.log(1111111, mm)

initializeUseSelector(mm.useSyncExternalStoreWithSelector)
connect.initializeConnect(React.useSyncExternalStore)

export * from './exports.ts'
