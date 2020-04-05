export default (data: any) => {
  if (data) {
    const dateint = Date.parse(data)
    const date = new Date(dateint)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hour = ('0' + date.getHours()).slice(-2)
    const min = ('0' + date.getMinutes()).slice(-2)
    const sec = ('0' + date.getSeconds()).slice(-2)
    const datestr =
      date.getFullYear() +
      '/' +
      month +
      '/' +
      day +
      ' ' +
      hour +
      ':' +
      min +
      ':' +
      sec
    return datestr
  } else {
    return ''
  }
}
