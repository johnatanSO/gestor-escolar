import { Column, CellFunctionParams } from '../../../../../src/models/columns'

export function useColumns(): Column[] {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value,
    },
    {
      headerName: 'Nome da disciplina',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nota 1',
      field: 'subjectGrades',
      valueFormatter: (params: CellFunctionParams) => params?.value?.firstGrade,
    },
    {
      headerName: 'Nota 2',
      field: 'subjectGrades',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.secondGrade,
    },
    {
      headerName: 'Total',
      field: 'subjectGrades',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.totalGrades,
    },
  ]
}
