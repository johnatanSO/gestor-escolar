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
  return (
    <>
      <button onClick={handleBack} className={style.backButton} type="button">
        <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        Voltar
      </button>
      <CustomTextField
        onChange={(event) => {
          setStudentToEdit({
            ...studentToEdit,
            grades: {
              ...studentToEdit.grades,
              firstGrade: event.target.value,
            },
          })
        }}
        value={studentToEdit?.grades?.firstGrade}
        label="Nota 1"
        placeholder="Digite a primeira nota"
        size="small"
        type="text"
        className={style.input}
      />
      <CustomTextField
        onChange={(event) => {
          setStudentToEdit({
            ...studentToEdit,
            grades: {
              ...studentToEdit.grades,
              secondGrade: event.target.value,
            },
          })
        }}
        value={studentToEdit?.grades?.secondGrade}
        label="Nota 2"
        placeholder="Digite a segunda nota"
        size="small"
        type="text"
        className={style.input}
      />
    </>
  )
}
