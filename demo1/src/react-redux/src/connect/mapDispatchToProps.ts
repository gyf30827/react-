import type { Action, Dispatch } from 'redux'
import bindActionCreators from '../utils/bindActionCreators.ts'
import * as wrapMapToProps from './wrapMapToProps.ts'
import { createInvalidArgFactory } from './invalidArgFactory.ts'
import type { MapDispatchToPropsParam } from './selectorFactory.ts'
const { wrapMapToPropsConstant, wrapMapToPropsFunc } = wrapMapToProps
export function mapDispatchToPropsFactory<TDispatchProps, TOwnProps>(
  mapDispatchToProps:
    | MapDispatchToPropsParam<TDispatchProps, TOwnProps>
    | undefined
) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object'
    ? wrapMapToPropsConstant((dispatch: Dispatch<Action<string>>) =>
        // @ts-ignore
        bindActionCreators(mapDispatchToProps, dispatch)
      )
    : !mapDispatchToProps
    ? wrapMapToPropsConstant((dispatch: Dispatch<Action<string>>) => ({
        dispatch,
      }))
    : typeof mapDispatchToProps === 'function'
    ? // @ts-ignore
      wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
    : createInvalidArgFactory(mapDispatchToProps, 'mapDispatchToProps')
}
