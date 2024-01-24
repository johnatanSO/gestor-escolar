import { Grade } from '..'
import { CustomTextField } from '../../../../../components/CustomTextField'

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
    <>
      <CustomTextField
        label="Nota 1"
        value={gradeToEditData.firstGrade}
        onChange={(event) => {
          setGradeToEditData({
            ...gradeToEditData,
            firstGrade: parseFloat(event.target.value),
          })
        }}
      />
      <CustomTextField
        label="Nota 2"
        value={gradeToEditData.firstGrade}
        onChange={(event) => {
          setGradeToEditData({
            ...gradeToEditData,
            secondGrade: parseFloat(event.target.value),
          })
        }}
      />
    </>
  )
}
