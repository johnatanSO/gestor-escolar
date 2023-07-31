import { Column, CellFunctionParams } from '../../../../src/models/columns'
import style from '../SubjectsGrades.module.scss'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Subject } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Params {
  handleShowStudents: (subject: Subject) => void
}

export function useColumns({ handleShowStudents }: Params): Column[] {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nome da disciplina',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Quantidade de alunos',
      field: 'students',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.length || 0,
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams) => {
        return (
          <button
            onClick={() => {
              handleShowStudents(params.data)
            }}
            type="button"
            className={style.showStudentsButton}
          >
            <FontAwesomeIcon icon={faGraduationCap} className={style.icon} />
            Ver alunos
          </button>
        )
      },
    },
  ]
}
