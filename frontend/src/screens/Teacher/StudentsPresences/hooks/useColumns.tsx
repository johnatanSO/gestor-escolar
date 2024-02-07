import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Student } from '../interfaces/Student'
import style from '../StudentsPresences.module.scss'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import { Checkbox } from '@mui/material'

interface UseColumnsParams {
  handleOpenPresences: (student: Student) => void
  handleCheckStudent: (idStudent: string, checked: boolean) => void
}

export function useColumns({
  handleOpenPresences,
  handleCheckStudent,
}: UseColumnsParams) {
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
      headerName: 'Presença',
      field: 'present',
      cellRenderer: (params: CellFunctionParams<Student>) => {
        return (
          <Checkbox
            onChange={(event) => {
              handleCheckStudent(params.data._id, event.target.checked)
            }}
            checked={params.value}
          />
        )
      },
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
                handleOpenPresences(params.data)
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
