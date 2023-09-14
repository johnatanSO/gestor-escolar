import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ActionButtons.module.scss'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Action {
  icon: IconProp
  title: string
  color?: string
  onClickFunction: (data?: any) => void
}

type Props = {
  actions: Action[]
  params: any
}

export function ActionButtons({ actions, params }: Props) {
  return (
    <div className={style.actionsContainer}>
      {actions?.map((action, key) => {
        return (
          <button
            style={{ backgroundColor: action?.color || '' }}
            key={key}
            type="button"
            title={action?.title}
            onClick={() => {
              action?.onClickFunction?.(params.data)
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={action.icon} />
            {action?.title}
          </button>
        )
      })}
    </div>
  )
}
