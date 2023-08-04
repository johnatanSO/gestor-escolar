import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NewWarning } from '..'
import { CustomTextField } from '../../../../components/CustomTextField'
import style from './FormNewWarning.module.scss'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
  newWarningData: NewWarning
  setNewWarningData: (value: NewWarning) => void
  handleBack: () => void
}

export function FormNewWarning({
  newWarningData,
  setNewWarningData,
  handleBack,
}: Props) {
  return (
    <div className={style.inputsContainer}>
      <button onClick={handleBack} className={style.backButton} type="button">
        <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        Voltar
      </button>
      <CustomTextField
        type="text"
        required
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
