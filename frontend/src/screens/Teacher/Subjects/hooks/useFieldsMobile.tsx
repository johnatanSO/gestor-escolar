import { Field } from '../../../../components/ListMobile/interfaces/Field'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: 'students',
      valueFormatter: (params: any) => params?.value?.length || 0,
    },
  ]
}
