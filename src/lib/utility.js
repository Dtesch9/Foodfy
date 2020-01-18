module.exports = {
  filteredArray(array) {
    const cleanedArray = array.map(item => {
      return item.replace(/'/g, ".")
    })

    return cleanedArray.filter(array => array != "")
  },
  date(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    }
  },
}