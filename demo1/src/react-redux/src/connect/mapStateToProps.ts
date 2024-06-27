import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps.ts'
import { createInvalidArgFactory } from './invalidArgFactory.ts'
import type { MapStateToPropsParam } from './selectorFactory.ts'

export function mapStateToPropsFactory<TStateProps, TOwnProps, State>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>
) {
  return !mapStateToProps
    ? wrapMapToPropsConstant(() => ({}))
    : typeof mapStateToProps === 'function'
    ? // @ts-ignore
      wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps')
    : createInvalidArgFactory(mapStateToProps, 'mapStateToProps')
}
