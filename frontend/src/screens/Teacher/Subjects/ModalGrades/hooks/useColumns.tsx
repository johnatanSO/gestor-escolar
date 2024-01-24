import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grade } from '..'
import { CellFunctionParams } from '../../../../../components/TableComponent/interfaces'
import style from '../ModalGrades.module.scss'
import { faPen } from '@fortawesome/free-solid-svg-icons'

type Props = {
  handleEditGrades: (grade: Grade) => void
}

export function useColumns({ handleEditGrades }: Props) {
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
      valueFormatter: (params: CellFunctionParams<Grade>) =>
        (params?.value || 0).toFixed(2),
    },
    {
      headerName: 'Nota 2',
      field: 'secondGrade',
      valueFormatter: (params: CellFunctionParams<Grade>) =>
        (params?.value || 0).toFixed(2),
    },
    {
      headerName: 'Total',
      field: 'total',
      valueFormatter: (params: CellFunctionParams<Grade>) =>
        (params?.data.firstGrade + params.data.secondGrade || 0).toFixed(2),
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Grade>) => {
        return (
          <div className={style.actionButtonsContainer}>
            <button
              onClick={() => {
                handleEditGrades(params.data)
              }}
              className={style.editGradesButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPen} className={style.icon} />
            </button>
          </div>
        )
      },
    },
  ]
}
