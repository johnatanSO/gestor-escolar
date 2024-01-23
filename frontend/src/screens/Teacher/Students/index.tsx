import { HeaderPage } from '../../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewStudent } from './ModalCreateNewStudent'
import { TableComponent } from '../../../components/TableComponent'
import { useColumns } from './hooks/useColumns'

import { AlertContext } from '../../../contexts/alertContext'
import { studentsService } from '../../../services/studentsService'
import { ListMobile } from '../../../components/ListMobile'
import style from './Students.module.scss'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export interface Student {
  _id: string
  code: string
  name: string
  email: string
  password: string
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
  const [studentDataToEdit, setStudentDataToEdit] = useState<
    Student | undefined
  >(undefined)

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
  }, [])

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
            getStudents()
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'error',
              text: `Erro ao tentar excluir aluno (${
                err?.response?.data?.message || err?.message
              })`,
            })
          })
      },
    })
  }

  function handleEditStudent(student: Student) {
    setFormModalOpened(true)
    setStudentDataToEdit(student)
  }

  const columns = useColumns({
    handleDeleteStudent,
    handleEditStudent,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo aluno"
        InputFilter={<h3>Alunos</h3>}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
          emptyText="Nenhum aluno cadastrado"
        />
      </div>
      <div className={style.viewMobile}>
        <ListMobile
          itemFields={fieldsMobile}
          collapseItems={[]}
          items={students}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewStudent
          studentDataToEdit={studentDataToEdit}
          getStudents={getStudents}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setStudentDataToEdit(undefined)
          }}
        />
      )}
    </>
  )
}
