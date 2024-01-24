import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../ModalAddStudents.module.scss'

export function useFieldsMobile() {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params?.value || '--',
    },
    {
      field: '',
      cellRenderer: (params: any) => {
        return (
          <button>
            <FontAwesomeIcon icon={faTrash} className={style.icon} />
          </button>
        )
      },
    },
  ]
}
