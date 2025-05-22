// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
// ModuleRegistry.registerModules([AllCommunityModule])
// import { AgGridReact } from 'ag-grid-react'
// import { useMemo, useState } from 'react'

// export function GradeBook() {
//   // Исходные данные без сегодняшней даты
//   const generateRandomScore = () => Math.floor(Math.random() * 11)

//   const dates = [
//     '05_05_2025',
//     '06_05_2025',
//     '07_05_2025',
//     '08_05_2025',
//     '09_05_2025',
//     '10_05_2025',
//     '11_05_2025',
//     '12_05_2025',
//     '13_05_2025',
//     '14_05_2025',
//     '15_05_2025',
//     '16_05_2025',
//     '17_05_2025',
//     '18_05_2025',
//     '19_05_2025',
//   ]

//   const users = [
//     'Асанов Курманбек',
//     'Малабакиев Рамзан',
//     'Жумагулов Талгат',
//     'Исаков Руслан',
//     'Кадыров Эльдар',
//     'Лазарев Максим',
//     'Мирзоев Бахтиёр',
//     'Нурматов Азат',
//     'Орлов Илья',
//     'Петров Сергей',
//     'Рахимов Шахриёр',
//     'Смирнова Ольга',
//     'Тимофеев Андрей',
//     'Умаров Заур',
//     'Федоров Константин',
//     'Хабибуллин Ринат',
//     'Цой Виктор',
//     'Чистяков Артём',
//     'Шарипов Арслан',
//     'Щербакова Мария',
//   ]

//   const initialRowData = users.map((fullName) => {
//     const scores = {}
//     dates.forEach((date) => {
//       scores[date] = generateRandomScore()
//     })
//     return { fullName, ...scores }
//   })

//   // Сегодняшняя дата
//   const todayDate = new Date().toLocaleDateString('ru-RU')
//   const todaySafe = todayDate.replace(/\./g, '_') // 'dd_mm_yyyy'

//   // Состояние с данными, чтобы можно было менять оценки по сегодняшней дате
//   const [rowData, setRowData] = useState(() => {
//     // Добавляем сегодня в данные, если нет
//     return initialRowData.map((row) => {
//       if (!(todaySafe in row)) {
//         return { ...row, [todaySafe]: 0 } // можно 0 или null по умолчанию
//       }
//       return row
//     })
//   })

//   // Формируем колонки с учётом сегодняшней даты
//   const columnDefs = useMemo(() => {
//     const baseFields = ['fullName']
//     // Собираем все даты из данных, включая сегодняшнюю
//     const allDateFieldsSet = new Set<string>()

//     rowData.forEach((row) => {
//       Object.keys(row).forEach((key) => {
//         if (!baseFields.includes(key)) {
//           allDateFieldsSet.add(key)
//         }
//       })
//     })

//     // Преобразуем в массив и сортируем даты так, чтобы сегодняшняя была первой
//     let allDateFields = Array.from(allDateFieldsSet)
//     allDateFields = allDateFields.sort((a, b) => {
//       if (a === todaySafe) return -1
//       if (b === todaySafe) return 1
//       // сортируем остальные по убыванию (от новых к старым)
//       return b.localeCompare(a)
//     })

//     return [
//       { field: 'fullName', headerName: 'ФИО', filter: true },
//       ...allDateFields.map((field) => ({
//         field,
//         width: 110,
//         headerName: field.replace(/_/g, '.'),
//         editable: field === todaySafe,
//         valueSetter: (params: any) => {
//           let value = Number(params.newValue)
//           if (isNaN(value)) return false
//           if (value < 0) value = 0
//           if (value > 10) value = 10
//           params.data[field] = value
//           // Обновляем rowData, чтобы React обновил компонент
//           setRowData((prev) =>
//             prev.map((r) =>
//               r.fullName === params.data.fullName ? params.data : r
//             )
//           )
//           return true
//         },
//       })),
//     ]
//   }, [rowData, todaySafe])

//   return (
//     <div>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={columnDefs}
//         domLayout="autoHeight"
//         pagination={true}
//         paginationPageSize={30}
//         paginationPageSizeSelector={[5, 10, 15, 20, 25, 30, 40]}
//       />
//     </div>
//   )
// }

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])
import { AgGridReact } from 'ag-grid-react'
import { Pagination } from '@heroui/react'
import { useMemo, useState } from 'react'

export function GradeBook() {
  const generateRandomScore = () => Math.floor(Math.random() * 11)

  const dates = [
    '05_05_2025', '06_05_2025', '07_05_2025', '08_05_2025', '09_05_2025',
    '10_05_2025', '11_05_2025', '12_05_2025', '13_05_2025', '14_05_2025',
    '15_05_2025', '16_05_2025', '17_05_2025', '18_05_2025', '19_05_2025',
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


  const initialRowData = users.map((fullName) => {
    const scores = {}
    dates.forEach((date) => {
      scores[date] = generateRandomScore()
    })
    return { fullName, ...scores }
  })

  const todayDate = new Date().toLocaleDateString('ru-RU')
  const todaySafe = todayDate.replace(/\./g, '_')

  const [rowData, setRowData] = useState(() =>
    initialRowData.map((row) =>
      !(todaySafe in row) ? { ...row, [todaySafe]: 0 } : row
    )
  )

  const baseFields = ['fullName']
  const allDateFieldsSet = new Set<string>()

  rowData.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!baseFields.includes(key)) {
        allDateFieldsSet.add(key)
      }
    })
  })

  let allDateFields = Array.from(allDateFieldsSet).sort((a, b) => {
    if (a === todaySafe) return -1
    if (b === todaySafe) return 1
    return b.localeCompare(a)
  })

  // 📄 Пагинация по датам
  const columnsPerPage = 8
  const totalPages = Math.ceil(allDateFields.length / columnsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const currentDateFields = allDateFields.slice(
    (currentPage - 1) * columnsPerPage,
    currentPage * columnsPerPage
  )

  const columnDefs = useMemo(() => {
    return [
      { field: 'fullName', headerName: 'ФИО', filter: true },
      ...currentDateFields.map((field) => ({
        field,
        width: 110,
        headerName: field.replace(/_/g, '.'),
        editable: field === todaySafe,
        valueSetter: (params: any) => {
          let value = Number(params.newValue)
          if (isNaN(value)) return false
          if (value < 0) value = 0
          if (value > 10) value = 10
          params.data[field] = value
          setRowData((prev) =>
            prev.map((r) =>
              r.fullName === params.data.fullName ? params.data : r
            )
          )
          return true
        },
      })),
    ]
  }, [rowData, currentDateFields, todaySafe])

  return (
    <div>
      <Pagination
        isCompact
        showControls
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
      <div className="ag-theme-alpine mt-4">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={30}
          paginationPageSizeSelector={[5, 10, 15, 20, 25, 30, 40]}
        />
      </div>
    </div>
  )
}
