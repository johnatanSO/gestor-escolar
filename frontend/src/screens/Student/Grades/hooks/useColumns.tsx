import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import style from '../Grades.module.scss'

export function useColumns() {
  function getAvarageStatus(grade: number) {
    if (grade > 5) return style.approved
    return style.disapproved
  }

  return [
    {
      headerName: 'Código',
      field: 'subjectCode',
      valueFormatter: (params: CellFunctionParams<any>) => params.value,
    },
    {
      headerName: 'Nome da disciplina',
      field: 'subjectName',
      valueFormatter: (params: CellFunctionParams<any>) => params.value || '--',
    },
    {
      headerName: 'Nota 1',
      field: 'subjectGrades',
      cellClass: (params: CellFunctionParams<any>) =>
        getAvarageStatus(params.value.firstGrade),
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value?.firstGrade?.toFixed(2),
    },
    {
      headerName: 'Nota 2',
      field: 'subjectGrades',
      cellClass: (params: CellFunctionParams<any>) =>
        getAvarageStatus(params.value.secondGrade),
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value?.secondGrade?.toFixed(2),
    },
    {
      headerName: 'Total',
      field: 'subjectGrades',
      cellClass: (params: CellFunctionParams<any>) =>
        `${style.totalGrade} ${getAvarageStatus(params.value.totalGrades)}`,
      valueFormatter: (params: CellFunctionParams<any>) =>
        params?.value?.totalGrades?.toFixed(2),
    },
  ]
}
