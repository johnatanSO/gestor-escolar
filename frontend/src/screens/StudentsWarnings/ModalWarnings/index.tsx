import { ModalLayout } from '../../../components/ModalLayout'
import style from './ModalWarnings.module.scss'
import { Student } from '..'
import { EmptyItems } from '../../../components/EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { warningsService } from '../../../services/warningsService'
import { AlertContext } from '../../../contexts/alertContext'
import { FormNewWarning } from './FormNewWarning'
import { Loading } from '../../../components/Loading'
import { Collapse, List, ListItem } from '@mui/material'

interface Props {
  studentData: Student
  open: boolean
  handleClose: () => void
  setStudentData: (values: Student) => void
}

export interface Warning {
  _id: string
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
  const [itemOpened, setItemOpened] = useState<any>({})

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

  function handleListItemClick(itemId: string) {
    setItemOpened({ [itemId]: !itemOpened[itemId] })
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

        {loadingWarnings && <Loading size={25} color="#cd1414" />}

        {isFormMode && (
          <FormNewWarning
            newWarningData={newWarningData}
            handleBack={() => {
              setIsFormMode(false)
            }}
            setNewWarningData={setNewWarningData}
          />
        )}

        {warnings?.length === 0 && !loadingWarnings && (
          <EmptyItems
            customStyle={{ boxShadow: 'none' }}
            text="Este aluno não possui advertências"
          />
        )}

        {!isFormMode && !loadingWarnings && (
          <List className={style.fieldsContainer}>
            {warnings?.map((warning) => {
              const isOpened = itemOpened[warning?._id] || false
              return (
                <div key={warning?.uniqueId} style={{ width: '100%' }}>
                  <ListItem
                    onClick={() => {
                      handleListItemClick(warning?._id)
                    }}
                    className={style.warningItem}
                  >
                    <span>{warning?.code}</span>
                    <span>{warning?.title}</span>
                    <span style={{ marginLeft: 'auto' }}>
                      {dayjs(warning?.date).format('DD/MM/YYYY - HH:mm')}
                    </span>
                    <FontAwesomeIcon
                      className={style.arrowIcon}
                      icon={isOpened ? faAngleUp : faAngleDown}
                    />
                  </ListItem>
                  <Collapse in={isOpened} timeout="auto" unmountOnExit>
                    <div className={style.descriptionContainer}>
                      <h4>Descrição</h4>
                      <p>{warning?.description}</p>
                    </div>
                  </Collapse>
                </div>
              )
            })}
          </List>
        )}
      </>
    </ModalLayout>
  )
}
