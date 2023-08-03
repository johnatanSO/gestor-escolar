import { ModalLayout } from '../../../components/ModalLayout'
import style from './ModalWarnings.module.scss'
import { Student } from '..'
import { EmptyItems } from '../../../components/EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { warningsService } from '../../../services/warningsService'
import { AlertContext } from '../../../contexts/alertContext'
import { FormNewWarning } from './FormNewWarning'
import { Loading } from '../../../components/Loading'

interface Props {
  studentData: Student
  open: boolean
  handleClose: () => void
  setStudentData: (values: Student) => void
}

export interface Warning {
  uniqueId: string
  code: string
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
  const [loadingWarnings, setLoadingWarnings] = useState<boolean>(true)
  const [warnings, setWarnings] = useState<Warning[]>([])
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
      .create({ idStudent: studentData?._id, newWarningData })
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Advertências cadastrada com sucesso',
        })
        getWarnings()
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

  function getWarnings() {
    setLoadingWarnings(true)
    warningsService
      .getAll(studentData?._id)
      .then((res) => {
        setWarnings(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ADVERTÊNCIAS')
        console.log(err?.response?.data?.message)
      })
      .finally(() => {
        setLoadingWarnings(false)
      })
  }

  useEffect(() => {
    getWarnings()
  }, [])

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
        {!isFormMode && (
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
        )}

        {isFormMode ? (
          <FormNewWarning
            newWarningData={newWarningData}
            setNewWarningData={setNewWarningData}
          />
        ) : (
          <ul className={style.fieldsContainer}>
            {warnings?.length === 0 && !loadingWarnings && (
              <EmptyItems
                customStyle={{ boxShadow: 'none' }}
                text="Este aluno não possui advertências"
              />
            )}

            {loadingWarnings && <Loading size={25} color="#cd1414" />}

            {warnings?.map((warning) => {
              return (
                <li className={style.warningItem} key={warning?.uniqueId}>
                  <span>{warning?.code}</span>
                  <span>{warning?.title}</span>
                  <span style={{ marginLeft: 'auto' }}>
                    {dayjs(warning?.date).format('DD/MM/YYYY - HH:mm')}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </>
    </ModalLayout>
  )
}
