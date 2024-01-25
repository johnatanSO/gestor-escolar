import style from './MenuSelectList.module.scss'

type Props = {
  menuSelected: string
  setMenuSelected: (menuSelected: string) => void
}

export function MenuSelectList({ menuSelected, setMenuSelected }: Props) {
  return (
    <nav className={style.menuContainer}>
      <button
        onClick={() => {
          setMenuSelected('included')
        }}
        disabled={menuSelected === 'included'}
        type="button"
        className={style.included}
      >
        Incluídos
      </button>
      <button
        onClick={() => {
          setMenuSelected('other')
        }}
        disabled={menuSelected === 'other'}
        className={style.other}
        type="button"
      >
        Outros alunos
      </button>
    </nav>
  )
}
