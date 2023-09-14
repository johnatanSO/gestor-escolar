import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EmptyItems.module.scss'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface EmpytItems {
  text: string
  icon?: IconProp
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
