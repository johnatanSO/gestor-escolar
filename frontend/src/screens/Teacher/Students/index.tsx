import { HeaderPage } from '../../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewStudent } from './ModalCreateNewStudent'
import { TableComponent } from '../../../components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../components/EmptyItems'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../contexts/alertContext'
import { Loading } from '../../../components/Loading'
import { studentsService } from '../../../services/studentsService'

export interface Student {
  _id: string
  name: string
  code: string
}

export function Students() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [students, setStudents] = useState<Student[]>([])
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const router = useRouter()

  function getStudents() {
    setLoadingStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        setStudents(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR DISCIPLINAS, ', err)
      })
      .finally(() => {
        setLoadingStudents(false)
      })
  }

  useEffect(() => {
    getStudents()
  }, [router.query])

  function handleDeleteStudent(student: Student) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este aluno do sistema?',
      onClickAgree: () => {
        studentsService
          .delete({ studentId: student?._id })
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'success',
              text: 'Aluno excluído com sucesso',
            })
            router.push({
              pathname: router.route,
              query: router.query,
            })
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'error',
              text: `Erro ao tentar excluir aluno (${err.response.data.error})`,
            })
          })
      },
    })
  }

  const columns = useColumns({
    handleDeleteStudent,
  })

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo aluno"
        InputFilter={<h3>Alunos</h3>}
      />

      {students?.length === 0 && loadingStudents && (
        <Loading size={30} color="#cd1414" />
      )}

      {students?.length > 0 && (
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
        />
      )}

      {students?.length === 0 && !loadingStudents && (
        <EmptyItems text="Nenhum aluno cadastrado no sistema" />
      )}

      {formModalOpened && (
        <ModalCreateNewStudent
          subjectDataToEdit={undefined}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
          }}
        />
      )}
    </>
  )
}
