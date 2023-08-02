import { NewWarning } from '..'
import { CustomTextField } from '../../../../components/CustomTextField'
import style from './FormNewWarning.module.scss'

type Props = {
  newWarningData: NewWarning
  setNewWarningData: (value: NewWarning) => void
}

export function FormNewWarning({ newWarningData, setNewWarningData }: Props) {
  return (
    <div className={style.inputsContainer}>
      <CustomTextField
        type="text"
        label="Título"
        value={newWarningData?.title}
        onChange={(event) => {
          setNewWarningData({
            ...newWarningData,
            title: event.target.value,
          })
        }}
        size="small"
      />
      <CustomTextField
        type="text"
        label="Descrição"
        value={newWarningData?.description}
        rows={4}
        multiline
        onChange={(event) => {
          setNewWarningData({
            ...newWarningData,
            description: event.target.value,
          })
        }}
        size="small"
      />
    </div>
  )
}
