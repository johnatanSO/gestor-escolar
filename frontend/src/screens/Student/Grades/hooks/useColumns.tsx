import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import style from '../Grades.module.scss'

export function useColumns() {
  function getAvarageStatus(grade: number) {
    console.log('GRADE', grade)
    if (grade >= 5) return style.approved
    return style.disapproved
  }

  return [
    {
      headerName: 'Código',
      field: 'subject',
      valueFormatter: (params: CellFunctionParams<any>) => params?.value?.code || '--',
    },
    {
      headerName: 'Disciplina',
      field: 'subject',
      valueFormatter: (params: CellFunctionParams<any>) => params?.value?.name || '--',
    },
    {
      headerName: 'Nota 1',
      field: 'firstGrade',
      cellClass: (params: CellFunctionParams<any>) =>
        getAvarageStatus(params?.value || 0),
      valueFormatter: (params: CellFunctionParams<any>) =>
        (params?.value || 0).toFixed(2),
    },
    {
      headerName: 'Nota 2',
      field: 'secondGrade',
      cellClass: (params: CellFunctionParams<any>) =>
        getAvarageStatus(params?.value || 0),
      valueFormatter: (params: CellFunctionParams<any>) =>
      (params?.value || 0).toFixed(2),
    },
    {
      headerName: 'Total',
      field: 'total',
      cellClass: (params: CellFunctionParams<any>) => {
        const total = params?.data?.firstGrade + params?.data?.secondGrade
        return `${style.totalGrade} ${getAvarageStatus((total || 0) / 2)}`
      },
      valueFormatter: (params: any) => {
        const total = params?.data?.firstGrade + params?.data?.secondGrade
        return ((total || 0) / 2).toFixed(2)
      }
    },
  ]
}
