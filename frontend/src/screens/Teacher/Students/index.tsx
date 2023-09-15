import { subjectsService } from '../../../services/subjectsService'
import { HeaderPage } from '../../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewStudent } from './ModalCreateNewStudent'
import { TableComponent } from '../../../components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../components/EmptyItems'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../contexts/alertContext'
import { Loading } from '../../../components/Loading'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function Students() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loadingSubjects, setLoadingSubjects] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const router = useRouter()

  function getSubjects() {
    setLoadingSubjects(true)
    subjectsService
      .getAll()
      .then((res) => {
        setSubjects(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR DISCIPLINAS, ', err)
      })
      .finally(() => {
        setLoadingSubjects(false)
      })
  }

  useEffect(() => {
    getSubjects()
  }, [router.query])

  function handleDeleteSubject(subject: Subject) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir esta disciplina?',
      onClickAgree: () => {
        subjectsService
          .delete({ idSubject: subject?._id })
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'success',
              text: 'Disciplina excluída com sucesso',
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
              text: `Erro ao tentar excluir disciplina (${err.response.data.error})`,
            })
          })
      },
    })
  }
  function handleAddStudents(subject: Subject) {}

  const columns = useColumns({
    handleDeleteSubject,
    handleAddStudents,
  })

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova disciplina"
        InputFilter={<h3>Disciplinas</h3>}
      />

      {subjects?.length === 0 && loadingSubjects && (
        <Loading size={30} color="#cd1414" />
      )}

      {subjects?.length > 0 && (
        <TableComponent
          loading={loadingSubjects}
          columns={columns}
          rows={subjects}
        />
      )}

      {subjects?.length === 0 && !loadingSubjects && (
        <EmptyItems text="Nenhuma disciplina foi encontrada" />
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
