import style from './FormEdit.module.scss'
import { CustomTextField } from '../../../../components/CustomTextField'
import { Student } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent } from 'react'

type Props = {
  gradesToEdit: any
  setGradesToEdit: (studentData: Student) => void
  handleBack: () => void
}

export function FormEdit({ gradesToEdit, setGradesToEdit, handleBack }: Props) {
  function handleChangeGrade(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    const copyGradesToEdit: any = { ...gradesToEdit }
    console.log('copyGradesToEdit', copyGradesToEdit)
    copyGradesToEdit[name] = value
    setGradesToEdit(copyGradesToEdit)
  }

  return (
    <>
      <button onClick={handleBack} className={style.backButton} type="button">
        <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        Voltar
      </button>
      <CustomTextField
        onChange={handleChangeGrade}
        value={gradesToEdit?.firstGrade || 0}
        name="firstGrade"
        label="Nota 1"
      />
      <CustomTextField
        onChange={handleChangeGrade}
        value={gradesToEdit?.secondGrade || 0}
        name="secondGrade"
        label="Nota 2"
      />
    </>
  )
}
