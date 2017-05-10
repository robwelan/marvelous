const relativePath = _ => {
  let sPath = ''
  if (window.location.hostname === 'robwelan.github.io') {
    sPath = '/marvelous'
  }

  return sPath
}

export { relativePath }
