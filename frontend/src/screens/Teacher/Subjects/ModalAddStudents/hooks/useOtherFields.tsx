import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Student } from '..'
import style from '../ModalAddStudents.module.scss'

type Props = {
  handleSelectStudentToAdd: (student:Student) => void
}

export function useOtherFields({handleSelectStudentToAdd}:Props) {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: '',
      cellRenderer: (params: any) => {
        return (
          <button onClick={() => {
            handleSelectStudentToAdd(params.data)
          }} type="button" className={style.addStudentButton}>
            <FontAwesomeIcon icon={faPlus} className={style.icon} />
          </button>
        )
      },
    },
  ]
}
