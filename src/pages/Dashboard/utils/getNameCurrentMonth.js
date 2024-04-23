import { getNameMonth } from './getNameMonth'

export function getNameCurrentMonth () {
  const month = new Date().getMonth() + 1
  return `${getNameMonth(month)}`
}
