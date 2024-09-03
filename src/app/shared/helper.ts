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

export function formatDateAndTime(utcTimeString: string) {
  const utcDate = new Date(utcTimeString + 'Z')

  const formattedDate = utcDate.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  return formattedDate
}
