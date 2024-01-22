import { Field } from '../../../../components/ListMobile/interfaces/Field'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'user',
      valueFormatter: (params: any) => params?.value?.name || '--',
    },
    {
      field: 'user',
      valueFormatter: (params: any) => params?.value?.email || '--',
    },
  ]
}
