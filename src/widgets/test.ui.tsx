import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'

type Student = {
  id: number
  name: string
  grade: number
}

const initialData: Student[] = [
  { id: 1, name: 'Рамзан Малабакиев', grade: 5 },
  { id: 2, name: 'Максат Каныбеков', grade: 4 },
  { id: 3, name: 'Ахмед Сартов', grade: 3 },
]

export default function GradeTable() {
  const [data, setData] = useState<Student[]>(initialData)

  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Студент',
        accessorKey: 'name',
      },
      {
        header: 'Оценка',
        accessorKey: 'grade',
        cell: ({ row, getValue }) => {
          const initialValue = getValue<number>()
          const [value, setValue] = useState(initialValue)

          const onBlur = () => {
            const newData = [...data]
            newData[row.index].grade = Number(value)
            setData(newData)
          }

          return (
            <input
              type="number"
              min={1}
              max={5}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              style={{
                width: '100%',
                padding: '4px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          )
        },
      },
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div style={{ padding: '20px' }}>
      <h2>Журнал успеваемости</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    background: '#f9f9f9',
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
