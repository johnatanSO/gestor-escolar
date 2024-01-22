import style from './TableComponent.module.scss'
import { Column } from './interfaces'
import { Skeleton } from '@mui/material'

interface Props {
  columns: Column[]
  rows: any[]
  loading: boolean
  emptyText?: string
}

export function TableComponent({ columns, rows, loading, emptyText }: Props) {
  console.log('ROWS', rows)
  console.log('columns', columns)
  return (
    <table style={loading ? { opacity: 0.5 } : {}} className={style.table}>
      <thead>
        <tr>
          {columns?.map((column) => {
            return (
              <th key={column.field}>
                <p>{column?.headerName || ''}</p>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 &&
          !loading &&
          rows?.map((row) => {
            return (
              <tr key={row._id}>
                {columns.map((column) => {
                  return (
                    <td
                      className={column?.cellClass?.({
                        value: row[column.field],
                        data: row,
                      })}
                      key={column.field}
                      style={{ flex: 1 }}
                    >
                      {column?.valueFormatter?.({
                        value: row[column.field],
                        data: row,
                      })}

                      {column?.cellRenderer?.({
                        value: row[column.field],
                        data: row,
                      })}
                    </td>
                  )
                })}
              </tr>
            )
          })}

        {rows.length === 0 && !loading && (
          <tr>
            <td className={style.emptyCell} colSpan={columns.length}>
              <p>{emptyText || 'Nenhum item encontrado'}</p>
            </td>
          </tr>
        )}

        {rows.length === 0 &&
          loading &&
          [1, 2, 3, 4, 5].map((item) => {
            return (
              <tr key={item}>
                {columns.map((column) => {
                  return (
                    <td
                      className={style.skeleton}
                      key={column.field}
                      style={{ flex: 1 }}
                    >
                      <Skeleton
                        variant="rounded"
                        height={25}
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
