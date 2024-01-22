import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewStudent.module.scss'
import { CustomTextField } from '../../../../components/CustomTextField'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { studentsService } from '../../../../services/studentsService'

export interface NewStudentData {
  name: string
  email: string
  password?: string
  user?: any
}

export interface StudentDataToEdit {
  user: NewStudentData
}

interface Props {
  studentDataToEdit: StudentDataToEdit | undefined
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewStudent({
  open,
  handleClose,
  studentDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewStudentValues = {
    name: '',
    email: '',
    password: '',
  }
  const [newStudentData, setNewStudentData] = useState<NewStudentData>(
    studentDataToEdit ? studentDataToEdit.user : defaultNewStudentValues,
  )
  const [loadingCreateNewStudent, setLoadingCreateNewStudent] =
    useState<boolean>(false)
  const router = useRouter()

  function onCreateNewStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCreateNewStudent(true)
    studentsService
      .create({ newStudentData })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewStudentData(defaultNewStudentValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Aluno cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar cadastrar aluno ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewStudent(false)
      })
  }

  function onEditStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCreateNewStudent(true)
    studentsService
      .updateStudent({ studentData: newStudentData })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewStudentData(defaultNewStudentValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados do aluno atualizados com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar atualizar dados do aluno ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewStudent(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={studentDataToEdit ? onEditStudent : onCreateNewStudent}
      title={studentDataToEdit ? 'Editar aluno ' : 'Cadastro de aluno'}
      submitButtonText={studentDataToEdit ? 'Atualizar' : 'Cadastrar'}
      loading={loadingCreateNewStudent}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          required
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          value={newStudentData?.name}
          onChange={(event) => {
            setNewStudentData({
              ...newStudentData,
              name: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          required
          label="E-mail"
          type="email"
          placeholder="Digite o email"
          value={newStudentData?.email}
          onChange={(event) => {
            setNewStudentData({
              ...newStudentData,
              email: event.target.value,
            })
          }}
        />
        {!studentDataToEdit && (
          <CustomTextField
            size="small"
            required
            label="Senha"
            type="password"
            placeholder="Digite a senha"
            value={newStudentData?.password}
            onChange={(event) => {
              setNewStudentData({
                ...newStudentData,
                password: event.target.value,
              })
            }}
          />
        )}
      </div>
    </ModalLayout>
  )
}
