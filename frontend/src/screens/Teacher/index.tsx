import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Teacher.module.scss'

export function Teacher() {
  return (
    <>
      <div className={style.avatarContainer}>
        <FontAwesomeIcon className={style.icon} icon={faUser} />
        <h3>nome</h3>
      </div>

      <ul className={style.buttonsContainer}>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faUser} />
          <h4>Notas</h4>
        </li>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faUser} />
          <h4>Advertências</h4>
        </li>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faUser} />
          <h4>Faltas</h4>
        </li>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faUser} />
          <h4>Gerenciar alunos</h4>
        </li>
      </ul>
    </>
  )
}
