import { Field } from '../../../../components/ListMobile/interfaces/Field'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: 'email',
      valueFormatter: (params: any) => params?.value || '--',
    },
  ]
}
