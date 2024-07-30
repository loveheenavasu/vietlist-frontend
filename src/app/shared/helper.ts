export function createSlug(id: string, title: string) {
  return `${title.split(' ').join('-').toLowerCase()}-${id}`
}

export const debounce = (fn: any, delay = 1000) => {
  let timerId: any = null
  return (...args: any) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn(...args), delay)
  }
}

export function clearSavedFilter() {
  let valuesForLocalStorageKey = [
    'city',
    'state',
    'zipcode',
    'country',
    'fullAddress',
    'price',
    'slidervalue',
    'street',
    'post_category',
    'post_title',
  ]
  valuesForLocalStorageKey.forEach((key) => localStorage.removeItem(key))
}
