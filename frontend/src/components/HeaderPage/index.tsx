import { ReactNode } from 'react'
import style from './HeaderPage.module.scss'

interface HeaderPageProps {
  buttonText?: string
  onClickFunction?: () => void
  InputFilter?: ReactNode
  customButtonStyle?: any
}

export function HeaderPage({
  buttonText,
  onClickFunction,
  InputFilter = <></>,
  customButtonStyle,
}: HeaderPageProps) {
  return (
    <header className={style.headerContainer}>
      {InputFilter && InputFilter}
      <div className={style.buttonsContainer}>
        {buttonText && onClickFunction && (
          <button
            style={customButtonStyle ?? customButtonStyle}
            className={style.createNewButton}
            onClick={onClickFunction}
          >
            {buttonText || 'Cadastrar'}
          </button>
        )}
      </div>
    </header>
  )
}
