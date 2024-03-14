import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grade } from '..'
import { CustomTextField } from '../../../../../components/CustomTextField'
import style from './FormEditGrade.module.scss'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
  gradeToEditData: Grade
  setGradeToEditData: (gradeData: Grade) => void
  handleBack: () => void
}

export function FormEditGrade({
  handleBack,
  gradeToEditData,
  setGradeToEditData,
}: Props) {
  return (
    <div className={style.inputsContainer}>
      <button onClick={handleBack} className={style.backButton} type="button">
        <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        Voltar
      </button>

      <CustomTextField
        label="Nota 1"
        value={gradeToEditData.firstGrade}
        onChange={(event) => {
          setGradeToEditData({
            ...gradeToEditData,
            firstGrade: parseFloat(event.target.value) || 0,
          })
        }}
      />
      <CustomTextField
        label="Nota 2"
        value={gradeToEditData.secondGrade}
        onChange={(event) => {
          setGradeToEditData({
            ...gradeToEditData,
            secondGrade: parseFloat(event.target.value) || 0,
          })
        }}
      />
    </div>
  )
}
