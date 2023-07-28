import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ActionButtons.module.scss'

interface Action {
  icon: any
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
            style={{ color: action?.color || '' }}
            key={key}
            type="button"
            title={action?.title}
            disabled={params?.data?.status === 'canceled'}
            onClick={() => {
              action?.onClickFunction?.(params.data)
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={action.icon} />
          </button>
        )
      })}
    </div>
  )
}
