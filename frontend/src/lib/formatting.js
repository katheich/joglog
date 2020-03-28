function formatTime(decTime, format) {
  let min = Math.floor(decTime)
  const sec = Math.floor((decTime - min) * 60)

  if (format === 'hms') {
    const hrs = Math.floor(min / 60)
    min = min % 60
    return `${hrs < 10 ? '0' + hrs : hrs}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`

  } else if (format === 'ms') {
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`

  } else {
    return decTime
  }
}

function deformatTime(hh, mm, ss) {

  if (hh === '') hh = 0
  if (mm === '') mm = 0
  if (ss === '') ss = 0

  hh = parseInt(hh)
  mm = parseInt(mm)
  ss = parseInt(ss)

  return (hh * 60) + mm + (ss / 60)
}

exports.formatTime = formatTime
exports.deformatTime = deformatTime