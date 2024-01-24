import dayjs from 'dayjs'
import { Warning } from '..'
import { CellFunctionParams } from '../../../../../components/TableComponent/interfaces'

export function useColumns() {
  return [
    {
      headerName: 'Título',
      field: 'title',
      valueFormatter: (params: CellFunctionParams<Warning>) => params.value,
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams<Warning>) => params.value,
    },
    {
      headerName: 'Criada em',
      field: 'createdAt',
      valueFormatter: (params: CellFunctionParams<Warning>) =>
        dayjs(params.value).format('DD/MM/YYYY HH:mm'),
    },
  ]
}
