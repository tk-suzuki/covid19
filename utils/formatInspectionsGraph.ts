type DataType = {
  日付: Date
  日検査数: number
}

type GraphDataType = {
  label: Date
  transition: number
  cumulative: number
}

export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let patSum = 0
  data
    .filter(d => new Date(d['日付']) < today)
    .forEach(d => {
      const date = new Date(d['日付'])
      const subTotal = d['日検査数']
      if (!isNaN(subTotal)) {
        patSum += subTotal
        graphData.push({
          label: date,
          transition: subTotal,
          cumulative: patSum
        })
      }
    })
  return graphData
}
