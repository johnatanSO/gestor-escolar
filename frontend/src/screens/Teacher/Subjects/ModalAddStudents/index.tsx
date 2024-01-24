import { ModalLayout } from '../../../../components/ModalLayout'
import {
  FormEvent,
  useState,
  useContext,
  useEffect,
  SyntheticEvent,
} from 'react'
import style from './ModalAddStudents.module.scss'
import { subjectsService } from '../../../../services/subjectsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { Subject } from '..'
import { studentsService } from '../../../../services/studentsService'
import { Checkbox, FormControlLabel } from '@mui/material'

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
      const studentInserted = subjectData?.students?.find(
        (subjectStudentId) => student?._id === subjectStudentId,
      )
      if (studentInserted) student.checked = true
    })
    setStudents(newStudents)
  }

  useEffect(() => {
    getStudents()
  }, [])

  function handleSelectStudent(checked: boolean, studentId: string) {
    const newStudents = [...students]
    newStudents.forEach((student) => {
      if (student?._id === studentId) {
        student.checked = checked
      }
    })
    setStudents(newStudents)
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onAddStudents}
      title="Adicionar alunos"
      submitButtonText="Confirmar"
      loading={loadingAddStudents}
    >
      <ul className={style.fieldsContainer}>
        {students.length === 0 && loadingGetStudents && 'CARREGANDO...'}
        {students?.map((student) => {
          return (
            <li key={student._id}>
              <FormControlLabel
                onChange={(
                  event: SyntheticEvent<Element>,
                  checked: boolean,
                ) => {
                  handleSelectStudent(checked, student._id)
                }}
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    checked={student?.checked}
                    sx={{
                      '&.Mui-checked': { color: '#cd1414' },
                    }}
                  />
                }
                label={student?.name || '--'}
              />
            </li>
          )
        })}
      </ul>
    </ModalLayout>
  )
}
