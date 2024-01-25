import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../ModalAddStudents.module.scss'

export function useIncludedFields() {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: '',
      cellRenderer: (params: any) => {
        return (
          <button type="button" className={style.removeStudentButton}>
            <FontAwesomeIcon icon={faTrash} className={style.icon} />
          </button>
        )
      },
    },
  ]
}
