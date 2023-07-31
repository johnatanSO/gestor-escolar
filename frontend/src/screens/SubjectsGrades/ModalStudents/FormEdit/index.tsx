import style from './FormEdit.module.scss'
import { CustomTextField } from '../../../../components/CustomTextField'
import { Student } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent } from 'react'

type Props = {
  studentToEdit: any
  setStudentToEdit: (studentData: Student) => void
  handleBack: () => void
}

export function FormEdit({
  studentToEdit,
  setStudentToEdit,
  handleBack,
}: Props) {
  function handleChangeGrade(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    const copyStudentToEdit: any = { ...studentToEdit }

    copyStudentToEdit.grades[name] = value
    setStudentToEdit(copyStudentToEdit)
  }

  return (
    <>
      <button onClick={handleBack} className={style.backButton} type="button">
        <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        Voltar
      </button>
      <CustomTextField
        onChange={handleChangeGrade}
        value={studentToEdit?.grades?.firstGrade || 0}
        name="firstGrade"
        label="Nota 1"
      />
      <CustomTextField
        onChange={handleChangeGrade}
        value={studentToEdit?.grades?.secondGrade || 0}
        name="secondGrade"
        label="Nota 2"
      />
    </>
  )
}
