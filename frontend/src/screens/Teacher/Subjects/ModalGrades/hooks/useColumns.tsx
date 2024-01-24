import { Grade } from '..'
import { CellFunctionParams } from '../../../../../components/TableComponent/interfaces'

export function useColumns() {
  return [
    {
      headerName: 'Aluno',
      field: 'student',
      valueFormatter: (params: CellFunctionParams<Grade>) =>
        params?.value?.name || '--',
    },
    {
      headerName: 'Nota 1',
      field: 'firstGrade',
      valueFormatter: (params: CellFunctionParams<Grade>) => params?.value || 0,
    },
    {
      headerName: 'Nota 2',
      field: 'secondGrade',
      valueFormatter: (params: CellFunctionParams<Grade>) => params?.value || 0,
    },
  ]
}
