const isEmpty = (obj) => {
   for (var x in obj) { if (obj.hasOwnProperty(x))  return false }
   return true
}

export { isEmpty }
