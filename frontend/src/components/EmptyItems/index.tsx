import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EmptyItems.module.scss'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

interface EmpytItems {
  text: string
  icon?: any
  customStyle?: any
}

export function EmptyItems({ text, icon, customStyle }: EmpytItems) {
  return (
    <div style={customStyle} className={style.emptyItemsContainer}>
      <h2>{text}</h2>
      <FontAwesomeIcon
        style={{ height: '4.5rem' }}
        icon={icon || faSquareXmark}
      />
    </div>
  )
}
