import { subjectsService } from '../../../services/subjectsService'
import { HeaderPage } from '../../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewSubject } from './ModalCreateNewSubject'
import { TableComponent } from '../../../../src/components/TableComponent'
import { Column } from '../../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../../src/contexts/alertContext'
import { ModalAddStudents } from './ModalAddStudents'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function InsertStudents() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>(
    undefined,
  )
  const [modalAddStudentsOpened, setModalAddStudentsOpened] =
    useState<boolean>(true)
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
  function handleAddStudents(subject: Subject) {
    setModalAddStudentsOpened(true)
    setSelectedSubject(subject)
  }

  const columns: Column[] = useColumns({
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
        <ModalCreateNewSubject
          subjectDataToEdit={undefined as any}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
          }}
        />
      )}

      {modalAddStudentsOpened && selectedSubject && (
        <ModalAddStudents
          subjectData={selectedSubject}
          open={modalAddStudentsOpened}
          handleClose={() => {
            setModalAddStudentsOpened(false)
            setSelectedSubject(undefined)
          }}
        />
      )}
    </>
  )
}
