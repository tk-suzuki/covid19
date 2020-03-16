import moment from 'moment'

const headers = [
  { text: '日付', value: 'date' },
  { text: '居住地', value: 'place' },
  { text: '年代', value: 'age' },
  { text: '性別', value: 'sex' }
]

type DataType = {
  date: Date
  place: string | null
  age: string | null
  sex: '男性' | '女性'
  [key: string]: any
}

type TableDataType = {
  date: string
  place: DataType['place']
  age: DataType['age']
  sex: DataType['sex'] | '不明'
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      date: moment(d['date']).format('MM/DD') ?? '不明',
      place: d['place'] ?? '不明',
      age: d['age'] ?? '不明',
      sex: d['sex'] ?? '不明'
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
