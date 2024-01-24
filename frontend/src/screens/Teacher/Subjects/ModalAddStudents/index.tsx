import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useState, useContext, useEffect } from 'react'
import { subjectsService } from '../../../../services/subjectsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { Subject } from '..'
import { studentsService } from '../../../../services/studentsService'
import { ListMobile } from '../../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useColumns'

interface Props {
  subjectData: Subject
  open: boolean
  handleClose: () => void
  getSubjects: () => void
}

export interface Student {
  _id: string
  name: string
  checked?: boolean
}

export function ModalAddStudents({
  open,
  handleClose,
  subjectData,
  getSubjects,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [loadingAddStudents, setLoadingAddStudents] = useState<boolean>(false)
  const [loadingGetStudents, setLoadingGetStudents] = useState<boolean>(true)
  const [students, setStudents] = useState<Student[]>([])

  function onAddStudents(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingAddStudents(true)

    const selectedStudentsIds = students
      .filter((student) => student?.checked)
      .map((student) => student._id)

    subjectsService
      .insertStudents({ selectedStudentsIds, subjectId: subjectData?._id })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Alunos associados com sucesso',
        })
        getSubjects()
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar associar alunos ' +
            `(${err?.response?.data?.message || err?.message})`,
        })
      })
      .finally(() => {
        setLoadingAddStudents(false)
      })
  }

  function getStudents() {
    setLoadingGetStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        setStudents(res.data.items)
        getStudentsInserted(res.data.items)
      })
      .catch((err) => {
        console.log('Erro ao buscar alunos, ' + err.response.data.message)
      })
      .finally(() => {
        setLoadingGetStudents(false)
      })
  }

  function getStudentsInserted(students: Student[]) {
    const newStudents = [...students]
    newStudents.forEach((student) => {
      const studentInserted = subjectData?.students?.includes(student?._id)

      if (studentInserted) student.checked = true
    })
    setStudents(newStudents)
  }

  /* function handleSelectStudent(checked: boolean, studentId: string) {
    const newStudents = [...students]
    newStudents.forEach((student) => {
      if (student?._id === studentId) {
        student.checked = checked
      }
    })
    setStudents(newStudents)
  } */

  const fieldsMobile = useFieldsMobile()

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onAddStudents}
      title="Adicionar alunos"
      submitButtonText="Confirmar"
      loading={loadingAddStudents}
    >
      <ListMobile
        collapseItems={[]}
        itemFields={fieldsMobile}
        items={students}
        emptyText="Nenhum aluno encontrado"
        loading={loadingGetStudents}
      />
    </ModalLayout>
  )
}
