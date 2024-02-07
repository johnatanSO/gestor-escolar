import dayjs from 'dayjs'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

export function useColumns() {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value || '--',
    },
    {
      headerName: 'Título',
      field: 'title',
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value || '--',
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value || '--',
    },
    {
      headerName: 'Data',
      field: 'date',
      valueFormatter: (params: CellFunctionParams<any>) =>
        dayjs(params?.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
