export const areArraysEqual = (sType, a, b) => {
  if (a === b) {
    return true
  }
  if (a == null || b == null) {
    return false
  }
  if (a.length !== b.length) {
    return false
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  if (sType === 'json') {
    let sJA = '',
        sJB = ''

    for (let i = 0; i < a.length; ++i) {
      sJA = JSON.stringify(a[i])
      sJB = JSON.stringify(b[i])

      if (sJA !== sJB) {
        return false
      }
    }
  }
  else {
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false
      }
    }
  }

  return true
}
