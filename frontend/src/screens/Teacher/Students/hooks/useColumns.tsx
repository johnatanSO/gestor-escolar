import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Student } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../Students.module.scss'

interface UseColumnsParams {
  handleDeleteStudent: (student: Student) => void
  handleEditStudent: (student: Student) => void
}

export function useColumns({
  handleDeleteStudent,
  handleEditStudent,
}: UseColumnsParams) {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<Student>) =>
        params.value || '--',
    },
    {
      headerName: 'Nome do aluno',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Student>) =>
        params.value || '--',
    },
    {
      headerName: 'E-mail',
      field: 'email',
      valueFormatter: (params: CellFunctionParams<Student>) =>
        params.value || '--',
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams<Student>) => {
        return (
          <div className={style.actionButtonsContainer}>
            <button
              onClick={() => {
                handleEditStudent(params.data)
              }}
              className={style.editStudentButton}
              type="button"
            >
              <FontAwesomeIcon icon={faPen} className={style.icon} />
            </button>
            <button
              onClick={() => {
                handleDeleteStudent(params.data)
              }}
              className={style.deleteStudentButton}
              type="button"
            >
              <FontAwesomeIcon icon={faTrash} className={style.icon} />
            </button>
          </div>
        )
      },
    },
  ]
}
