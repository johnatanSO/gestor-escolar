import { faPen } from '@fortawesome/free-solid-svg-icons'
import style from '../ModalStudents.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Student } from '..'
import { CellFunctionParams } from '../../../../../components/TableComponent/interfaces'

type Params = {
  handleEditGrades: (student: Student) => void
}

export function useColumns({ handleEditGrades }: Params) {
  return [
    {
      field: 'code',
      headerName: 'Código',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      field: 'name',
      headerName: 'Aluno',
      valueFormatter: (params: CellFunctionParams) => params?.value || '--',
    },
    {
      field: 'grades',
      headerName: 'Nota 1',
      valueFormatter: (params: CellFunctionParams) => {
        return (Number(params?.value?.firstGrade) || 0).toFixed(2)
      },
    },
    {
      field: 'grades',
      headerName: 'Nota 2',
      valueFormatter: (params: CellFunctionParams) => {
        return (Number(params?.value?.secondGrade) || 0).toFixed(2)
      },
    },
    {
      field: 'grades',
      headerName: 'Final',
      valueFormatter: (params: CellFunctionParams) => {
        return (params?.value?.totalGrades || 0).toFixed(2)
      },
    },
    {
      field: 'acoes',
      headerName: '',
      valueFormatter: (params: CellFunctionParams) => (
        <FontAwesomeIcon
          onClick={() => {
            handleEditGrades(params?.data)
          }}
          icon={faPen}
          className={style.iconEdit}
        />
      ),
    },
  ]
}
