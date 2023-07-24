import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Student() {
  return (
    <>
      <section>
        <FontAwesomeIcon icon={faUser} />
        <h3>nome_do_aluno</h3>
      </section>
    </>
  )
}
