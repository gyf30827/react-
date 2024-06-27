import isPlainObject from './isPlainObject.ts'
import warning from './warning.ts'

export default function verifyPlainObject(
  value: unknown,
  displayName: string,
  methodName: string
) {
  if (!isPlainObject(value)) {
    warning(
      `${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`
    )
  }
}
