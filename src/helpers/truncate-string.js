/*
  sText: the String you wish to truncate
  nLen: a Number (integer) to truncate to
  bElipsis: a Boolean. Set this to true if you wish to include an elipsis on the end of the string.
  Starts truncation at the first letter.
*/
const truncateString = (sText, nLen, bElipsis) => {
  let sTemp = sText

  if (nLen === 0) {
    return sTemp
  }
  if (sTemp.length > nLen) {
    if (bElipsis === true) {
      sTemp = sTemp.substring(0, (nLen - 3))
    } else {
      sTemp = sTemp.substring(0, nLen)
    }
  } else {
    return sTemp
  }
  if (sTemp.length <= 3) {
    return sTemp
  }
  if (bElipsis === true) {
    return `${sTemp.trim()}...`
  }

  return sTemp
}

export { truncateString }
