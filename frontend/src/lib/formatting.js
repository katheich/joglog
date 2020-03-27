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

exports.formatTime = formatTime