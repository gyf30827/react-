// functions
import { createStore, legacy_createStore } from './createStore.ts'
import combineReducers from './combineReducers.ts'
import bindActionCreators from './bindActionCreators.ts'
import applyMiddleware from './applyMiddleware.ts'
import compose from './compose.ts'
import isAction from './utils/isAction.ts'
import isPlainObject from './utils/isPlainObject.ts'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes.ts'

import {
  Dispatch as _Dispatch,
  Unsubscribe as _Unsubscribe,
  Observable as _Observable,
  Observer as _Observer,
  Store as _Store,
  StoreCreator as _StoreCreator,
  StoreEnhancer as _StoreEnhancer,
  StoreEnhancerStoreCreator as _StoreEnhancerStoreCreator
} from './types/store.ts'

export type Dispatch = _Dispatch
export type Unsubscribe = _Unsubscribe
export type Observable = _Observable
export type Store = _Store
export type StoreCreator = _StoreCreator
export type StoreEnhancer = _StoreEnhancer
export type StoreEnhancerStoreCreator = StoreEnhancerStoreCreator

// reducers
import {
  Reducer as _Reducer,
  ReducersMapObject as _ReducersMapObject,
  StateFromReducersMapObject as _StateFromReducersMapObject,
  ReducerFromReducersMapObject as _ReducerFromReducersMapObject,
  ActionFromReducer as _ActionFromReducer,
  ActionFromReducersMapObject as _ActionFromReducersMapObject,
  PreloadedStateShapeFromReducersMapObject as _PreloadedStateShapeFromReducersMapObject
} from './types/reducers.ts'
export type Reducer = _Reducer
export type ReducersMapObject = _ReducersMapObject
export type StateFromReducersMapObject = _StateFromReducersMapObject
export type ReducerFromReducersMapObject = _ReducerFromReducersMapObject
export type ActionFromReducer = _ActionFromReducer
export type ActionFromReducersMapObject = _ActionFromReducersMapObject
export type PreloadedStateShapeFromReducersMapObject =
  _PreloadedStateShapeFromReducersMapObject

// action creators
import {
  ActionCreator as _ActionCreator,
  ActionCreatorsMapObject as _ActionCreatorsMapObject
} from './types/actions.ts'
export type ActionCreator = _ActionCreator
export type ActionCreatorsMapObject = _ActionCreatorsMapObject

// middleware
import {
  MiddlewareAPI as _MiddlewareAPI,
  Middleware as _Middleware
} from './types/middleware.ts'
export type MiddlewareAPI = _MiddlewareAPI
export type Middleware = _Middleware
// actions
import {
  Action as _Action,
  UnknownAction as _UnknownAction,
  AnyAction as _AnyAction
} from './types/actions.ts'
export type Action = _Action
export type UnknownAction = _UnknownAction
export type AnyAction = _AnyAction

export {
  createStore,
  legacy_createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  isAction,
  isPlainObject,
  __DO_NOT_USE__ActionTypes
}
