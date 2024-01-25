import { ModalLayout } from '../../../../components/ModalLayout'
import { FormEvent, useState, useContext, useEffect } from 'react'
import { subjectsService } from '../../../../services/subjectsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { Subject } from '..'
import { studentsService } from '../../../../services/studentsService'
import { ListMobile } from '../../../../components/ListMobile'
import { useIncludedFields } from './hooks/useIncludedFields'
import { MenuSelectList } from './MenuSelectList'
import { useOtherFields } from './hooks/useOtherFields'
import { ListStudent } from './ListSudents'

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
  const [registeredStudents, setRegisteredStudents] = useState<Student[]>([])
  const [otherStudents, setOtherStudents] = useState<Student[]>([])
  const [menuSelected, setMenuSelected] = useState<string>('included')

  function onAddStudents(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingAddStudents(true)

    const selectedStudentsIdsToAdd = otherStudents
      .filter((student) => student?.checked)
      .map((student) => student._id)

    subjectsService
      .insertStudents({ selectedStudentsIdsToAdd, subjectId: subjectData?._id })
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
    const _registeredStudents: Student[] = []
    const _otherStudents: Student[] = []

    newStudents.forEach((student) => {
      const studentInserted = subjectData?.students?.includes(student?._id)

      if (studentInserted) {
        _registeredStudents.push(student)
      } else {
        _otherStudents.push(student)
      }
    })
    setRegisteredStudents(_registeredStudents)
    setOtherStudents(_otherStudents)
  }

  function handleSelectStudentToAdd(student:Student) {
    const copyOtherStudent = [...otherStudents]

    copyOtherStudent.forEach(currentStudent => {
      if(currentStudent._id === student._id) {
        currentStudent.checked = true
      }
    })

    setOtherStudents(copyOtherStudent)
  } 

  function handleSelectStudentToRemove(student:Student) {
    const copyRegisteredStudents = [...registeredStudents]

    copyRegisteredStudents.forEach(currentStudent => {
      if(currentStudent._id === student._id) {
        currentStudent.checked = true
      }
    })

    setRegisteredStudents(copyRegisteredStudents)
  } 

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onAddStudents}
      title={menuSelected === 'included' ? 'Remover alunos': 'Adicionar alunos'}
      submitButtonText={menuSelected === 'included' ? 'Remover' : 'Adicionar'}
      loading={loadingAddStudents}
      customStyleButton={menuSelected === 'other' ? {backgroundColor: "#3264ff"} :{}}
    >
      <MenuSelectList menuSelected={menuSelected} setMenuSelected={setMenuSelected} />

      {menuSelected === 'included' && (
        <ListStudent
          students={registeredStudents}
          handleSelectItem={handleSelectStudentToRemove}
          loading={loadingGetStudents}
        />
      )}

      {menuSelected === 'other' && (
        <ListStudent
          students={otherStudents}
          handleSelectItem={handleSelectStudentToAdd}
          loading={loadingGetStudents}
        />
      )}
    </ModalLayout>
  )
}
