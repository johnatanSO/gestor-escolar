import {
  faAngleLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'
import style from './HeaderMenu.module.scss'

type Props = {
  title: string
  showBackButton: boolean
}

export function HeaderMenu({ title, showBackButton }: Props) {
  const router = useRouter()

  function logout() {
    usersService.deleteToken()
    router.push('/login')
  }

  return (
    <header className={style.headerPage}>
      {showBackButton ? (
        <button
          className={style.backButton}
          type="button"
          onClick={router.back}
        >
          <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
          Voltar
        </button>
      ) : (
        <h2>{title || 'Gestor escolar'}</h2>
      )}
      <button className={style.logoutButton} onClick={logout} type="button">
        <FontAwesomeIcon className={style.icon} icon={faRightFromBracket} />
        Sair
      </button>
    </header>
  )
}
