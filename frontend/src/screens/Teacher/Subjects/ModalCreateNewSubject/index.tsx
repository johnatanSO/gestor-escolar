import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewSubject.module.scss'
import { CustomTextField } from '../../../../components/CustomTextField'
import { subjectsService } from '../../../../services/subjectsService'
import { AlertContext } from '../../../../contexts/alertContext'

export interface NewSubjectData {
  name: string
  stock: string
  value: string
  isDefault: boolean
}

interface Props {
  subjectDataToEdit: NewSubjectData | undefined
  open: boolean
  handleClose: () => void
  getSubjects: () => void
}

export function ModalCreateNewSubject({
  open,
  handleClose,
  subjectDataToEdit,
  getSubjects,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewSubjectValues = {
    name: '',
    stock: '0',
    value: '0',
    isDefault: false,
  }
  const [newSubjectData, setNewSubjectData] = useState<NewSubjectData>(
    subjectDataToEdit || defaultNewSubjectValues,
  )
  const [loadingCreateNewSubject, setLoadingCreateNewSubject] =
    useState<boolean>(false)

  function onCreateNewSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newSubjectData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    }
    subjectsService
      .create({ newSubjectData })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Disciplina cadastrada com sucesso',
        })

        setNewSubjectData(defaultNewSubjectValues)
        handleClose()
        getSubjects()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar cadastrar disciplina ' +
            `(${err?.response?.data?.message || err?.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewSubject(false)
      })
  }

  function onEditSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newSubjectData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    }
    subjectsService
      .update({ subjectData: newSubjectData })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados da disciplina atualizados com sucesso',
        })
        setNewSubjectData(defaultNewSubjectValues)
        handleClose()
        getSubjects()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar atualizar dados da disciplina ' +
            `(${err?.response?.data?.message || err?.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewSubject(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={subjectDataToEdit ? onEditSubject : onCreateNewSubject}
      title="Cadastro de disciplina"
      submitButtonText="Cadastrar"
      loading={loadingCreateNewSubject}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          required
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          value={newSubjectData?.name}
          onChange={(event) => {
            setNewSubjectData({
              ...newSubjectData,
              name: event.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
