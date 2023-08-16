import { Column, CellFunctionParams } from '../../../../../src/models/columns'
import style from '../Grades.module.scss'

export function useColumns(): Column[] {
  function getAvarageStatus(grade: number) {
    if (grade > 5) return style.approved
    return style.disapproved
  }

  return [
    {
      headerName: 'Código',
      field: 'subjectCode',
      valueFormatter: (params: CellFunctionParams) => params.value,
    },
    {
      headerName: 'Nome da disciplina',
      field: 'subjectName',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nota 1',
      field: 'subjectGrades',
      cellClass: (params: CellFunctionParams) =>
        getAvarageStatus(params.value.firstGrade),
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.firstGrade?.toFixed(2),
    },
    {
      headerName: 'Nota 2',
      field: 'subjectGrades',
      cellClass: (params: CellFunctionParams) =>
        getAvarageStatus(params.value.secondGrade),
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.secondGrade?.toFixed(2),
    },
    {
      headerName: 'Total',
      field: 'subjectGrades',
      cellClass: (params: CellFunctionParams) =>
        `${style.totalGrade} ${getAvarageStatus(params.value.totalGrades)}`,
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.totalGrades?.toFixed(2),
    },
  ]
}
