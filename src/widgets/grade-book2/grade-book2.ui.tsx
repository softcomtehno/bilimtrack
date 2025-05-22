import { useMemo, useState, useEffect, useRef } from 'react'

export function GradeBook2() {
  const generateRandomScore = () => Math.floor(Math.random() * 11)

  const dates = [
    '05_05_2025',
    '06_05_2025',
    '07_05_2025',
    '08_05_2025',
    '09_05_2025',
    '10_05_2025',
    '11_05_2025',
    '12_05_2025',
    '13_05_2025',
    '14_05_2025',
    '15_05_2025',
    '16_05_2025',
    '17_05_2025',
    '18_05_2025',
    '19_05_2025',
    '20_05_2025',
  ]

  const users = [
    'Асанов Курманбек',
    'Малабакиев Рамзан',
    'Жумагулов Талгат',
    'Исаков Руслан',
    'Кадыров Эльдар',
    'Лазарев Максим',
    'Мирзоев Бахтиёр',
    'Нурматов Азат',
    'Орлов Илья',
    'Петров Сергей',
    'Рахимов Шахриёр',
    'Смирнова Ольга',
    'Тимофеев Андрей',
    'Умаров Заур',
    'Федоров Константин',
    'Хабибуллин Ринат',
    'Цой Виктор',
    'Чистяков Артём',
    'Шарипов Арслан',
    'Щербакова Мария',
  ]

  const todayDate = new Date().toLocaleDateString('ru-RU').replace(/\./g, '_')

  const [rowData, setRowData] = useState(() => {
    return users.map((fullName) => {
      const scores = {} as Record<string, number>
      dates.forEach((date) => {
        scores[date] = generateRandomScore()
      })
      return { fullName, ...scores }
    })
  })

  const sortedDates = useMemo(() => {
    const allDateFields = new Set<string>()
    rowData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== 'fullName') {
          allDateFields.add(key)
        }
      })
    })
    return Array.from(allDateFields).sort((a, b) => a.localeCompare(b))
  }, [rowData])

  const [page, setPage] = useState(0)
  const pageSize = 5
  const totalPages = Math.ceil(sortedDates.length / pageSize)

  useEffect(() => {
    const todayIndex = sortedDates.indexOf(todayDate)
    if (todayIndex !== -1) {
      setPage(Math.floor(todayIndex / pageSize))
    }
  }, [sortedDates, todayDate])

  const handleScoreChange = (
    fullName: string,
    field: string,
    value: string
  ) => {
    const newValue = Number(value)
    if (isNaN(newValue)) return
    const clamped = Math.max(0, Math.min(10, newValue))
    setRowData((prev) =>
      prev.map((row) =>
        row.fullName === fullName ? { ...row, [field]: clamped } : row
      )
    )
  }

  const paginatedDates = sortedDates.slice(
    page * pageSize,
    (page + 1) * pageSize
  )
  const tableRef = useRef<HTMLTableElement>(null)

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              page === i ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <table
        ref={tableRef}
        className="min-w-full text-sm text-left border border-gray-300 group"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ФИО</th>
            {paginatedDates.map((date) => (
              <th
                key={date}
                className={`px-4 py-2 border whitespace-nowrap ${
                  date === todayDate ? 'bg-green-100 sticky right-0 z-10' : ''
                }`}
              >
                {date.replace(/_/g, '.')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, rowIndex) => (
            <tr
              key={row.fullName}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
              onMouseEnter={() => {
                if (!tableRef.current) return
                const cells = tableRef.current.querySelectorAll(
                  `td[data-row='${rowIndex}']`
                )
                cells.forEach((cell) => cell.classList.add('bg-yellow-100'))
              }}
              onMouseLeave={() => {
                if (!tableRef.current) return
                const cells = tableRef.current.querySelectorAll(
                  `td[data-row='${rowIndex}']`
                )
                cells.forEach((cell) => cell.classList.remove('bg-yellow-100'))
              }}
            >
              <td className="px-4 py-2 border whitespace-nowrap sticky left-0 bg-white z-10">
                {row.fullName}
              </td>
              {paginatedDates.map((date, colIndex) => (
                <td
                  key={date}
                  data-row={rowIndex}
                  className={`px-4 py-2 border text-center whitespace-nowrap ${
                    date === todayDate ? 'bg-green-50 sticky right-0' : ''
                  }`}
                >
                  {date === todayDate ? (
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={row[date]}
                      onChange={(e) =>
                        handleScoreChange(row.fullName, date, e.target.value)
                      }
                      className="w-16 border rounded px-1 py-0.5 text-center"
                    />
                  ) : (
                    row[date]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
