import dayjs from 'dayjs'
import { Field } from '../../../../../components/ListMobile/interfaces/Field'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'title',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: 'createdAt',
      valueFormatter: (params: any) =>
        dayjs(params?.value).format('DD/MM/YYYY HH:mm') || '--',
    },
  ]
}
