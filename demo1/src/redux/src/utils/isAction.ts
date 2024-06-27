import type { Action } from '../types/actions.ts'
import isPlainObject from './isPlainObject.ts'

export default function isAction(action: unknown): action is Action<string> {
  return (
    isPlainObject(action) &&
    'type' in action &&
    typeof (action as Record<'type', unknown>).type === 'string'
  )
}
