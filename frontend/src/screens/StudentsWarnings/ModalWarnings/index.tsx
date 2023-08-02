import { ModalLayout } from '../../../components/ModalLayout'
import style from './ModalAddStudents.module.scss'
import { Student } from '..'
import { EmptyItems } from '../../../components/EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useState } from 'react'
import dayjs from 'dayjs'
import { warningsService } from '../../../services/warningsService'
import { AlertContext } from '../../../contexts/alertContext'
import { FormNewWarning } from './FormNewWarning'

interface Props {
  studentData: Student
  open: boolean
  handleClose: () => void
  setStudentData: (values: Student) => void
}

export interface Warning {
  uniqueId: string
  number: string
  title: string
  description: string
  date: string | Date
}

export interface NewWarning {
  title: string
  description: string
}

export function ModalWarnings({
  open,
  handleClose,
  studentData,
  setStudentData,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [isFormMode, setIsFormMode] = useState<boolean>(false)
  const defaultValuesNewWarning = {
    title: '',
    description: '',
  }
  const [newWarningData, setNewWarningData] = useState<NewWarning>(
    defaultValuesNewWarning,
  )
  const [loadingCreateWarning, setLoadingCrateWarning] =
    useState<boolean>(false)

  function onCreateNewWarning(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCrateWarning(true)
    warningsService
      .create({ studentId: studentData?._id, newWarningData })
      .then((res) => {
        const { newWarning } = res.data.item
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Advertências cadastrada com sucesso',
        })
        setStudentData({
          ...studentData,
          warnings: [...studentData.warnings, newWarning],
        })
        setIsFormMode(false)
        setNewWarningData(defaultValuesNewWarning)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text:
            'Advertências cadastrada com sucesso, ' + err.response.data.message,
        })
      })
      .finally(() => {
        setLoadingCrateWarning(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={isFormMode ? onCreateNewWarning : undefined}
      title="Advertências"
      submitButtonText={isFormMode ? 'Confirmar' : ''}
      loading={loadingCreateWarning}
    >
      <>
        <button
          type="button"
          className={style.buttonNewWarning}
          onClick={() => {
            setIsFormMode(true)
          }}
        >
          <FontAwesomeIcon className={style.icon} icon={faPlus} />
          Nova advertência
        </button>
        {isFormMode ? (
          <FormNewWarning
            newWarningData={newWarningData}
            setNewWarningData={setNewWarningData}
          />
        ) : (
          <ul className={style.fieldsContainer}>
            {studentData?.warnings?.length === 0 && (
              <EmptyItems text="Aluno não possui advertências" />
            )}
            {studentData?.warnings?.map((warning) => {
              return (
                <li key={warning?.uniqueId}>
                  <span>{warning?.number}</span>
                  <span>{dayjs(warning?.date).format('DD/MM/YYYY')}</span>
                  <span>{warning?.title}</span>
                </li>
              )
            })}
          </ul>
        )}
      </>
    </ModalLayout>
  )
}
