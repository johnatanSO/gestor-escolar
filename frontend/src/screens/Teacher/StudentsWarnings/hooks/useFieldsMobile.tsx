import { Field } from '../../../../components/ListMobile/interfaces/Field'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: 'warningsAmount',
      valueFormatter: (params: any) => params?.value || '--',
    },
  ]
}
