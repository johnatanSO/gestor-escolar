import { subjectsService } from '../../../services/subjectsService'
import { HeaderPage } from '../../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewSubject } from './ModalCreateNewSubject'
import { TableComponent } from '../../../components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { AlertContext } from '../../../contexts/alertContext'
import { ModalAddStudents } from './ModalAddStudents'
import style from './InsertStudents.module.scss'
import { ListMobile } from '../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function Subjects() {
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
  }, [])

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
            getSubjects()
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'error',
              text: `Erro ao tentar excluir disciplina (${err.response.data.message})`,
            })
          })
      },
    })
  }

  function handleAddStudents(subject: Subject) {
    setModalAddStudentsOpened(true)
    setSelectedSubject(subject)
  }

  const columns = useColumns({
    handleDeleteSubject,
    handleAddStudents,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        buttonText="Nova disciplina"
        InputFilter={<h3>Disciplinas</h3>}
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingSubjects}
          columns={columns}
          rows={subjects}
          emptyText="Nenhuma disciplina cadastrada"
        />
      </div>
      <div className={style.viewMobile}>
        <ListMobile
          collapseItems={[]}
          itemFields={fieldsMobile}
          items={subjects}
          emptyText="Nenhuma disciplina cadastrada"
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewSubject
          subjectDataToEdit={undefined}
          open={formModalOpened}
          getSubjects={getSubjects}
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
