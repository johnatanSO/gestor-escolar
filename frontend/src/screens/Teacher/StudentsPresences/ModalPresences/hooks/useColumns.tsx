import dayjs from 'dayjs'
import { Warning } from '..'
import { CellFunctionParams } from '../../../../../components/TableComponent/interfaces'
import { Student } from '../../interfaces/Student'

export function useColumns() {
  return [
    {
      headerName: 'Título',
      field: 'title',
      valueFormatter: (params: CellFunctionParams<Student>) => params.value,
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams<Student>) => params.value,
    },
    {
      headerName: 'Criada em',
      field: 'createdAt',
      valueFormatter: (params: CellFunctionParams<Warning>) =>
        dayjs(params.value).format('DD/MM/YYYY HH:mm'),
    },
  ]
}
