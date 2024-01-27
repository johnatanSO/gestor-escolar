import dayjs from 'dayjs'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

export function useFieldsMobile() {
  return [
    {
      field: 'title',
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value || '--',
    },
    {
      field: 'date',
      valueFormatter: (params: CellFunctionParams<any>) =>
        dayjs(params?.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
