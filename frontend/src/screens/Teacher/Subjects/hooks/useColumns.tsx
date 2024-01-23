import { faGraduationCap, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Subject } from '..'
import style from '../InsertStudents.module.scss'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface UseColumnsParams {
  handleDeleteSubject: (subject: Subject) => void
  handleAddStudents: (subject: Subject) => void
}

export function useColumns({
  handleDeleteSubject,
  handleAddStudents,
}: UseColumnsParams) {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<Subject>) =>
        params.value || '--',
    },
    {
      headerName: 'Nome da disciplina',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Subject>) =>
        params.value || '--',
    },
    {
      headerName: 'Quantidade de alunos',
      field: 'students',
      valueFormatter: (params: CellFunctionParams<Subject>) =>
        params?.value?.length || 0,
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams<Subject>) => {
        return (
          <div className={style.actionButtonsContainer}>
            <button
              onClick={() => {
                handleAddStudents(params.data)
              }}
              className={style.editStudentButton}
              type="button"
            >
              <FontAwesomeIcon icon={faGraduationCap} className={style.icon} />
            </button>
            <button
              onClick={() => {
                handleDeleteSubject(params.data)
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
