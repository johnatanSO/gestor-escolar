import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { Student } from '..'
import style from '../StudentsWarnings.module.scss'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface UseColumnsParams {
  handleOpenWarnings: (student: Student) => void
}

export function useColumns({ handleOpenWarnings }: UseColumnsParams) {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<Student>) =>
        params.value || '--',
    },
    {
      headerName: 'Aluno',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Student>) =>
        params?.value || '--',
    },
    {
      headerName: 'Advertências',
      field: 'warningsAmount',
      valueFormatter: (params: CellFunctionParams<Student>) =>
        params?.value || 0,
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Student>) => {
        return (
          <div className={style.actionButtonsContainer}>
            <button
              onClick={() => {
                handleOpenWarnings(params.data)
              }}
              className={style.openWarningsButton}
              type="button"
            >
              <FontAwesomeIcon icon={faWarning} className={style.icon} />
            </button>
          </div>
        )
      },
    },
  ]
}
