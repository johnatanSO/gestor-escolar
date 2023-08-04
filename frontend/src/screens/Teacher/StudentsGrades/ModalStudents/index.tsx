import { ModalLayout } from '../../../../components/ModalLayout'
import { useState, useEffect, useContext, FormEvent } from 'react'
import style from './ModalStudents.module.scss'
import { Subject } from '..'
import { studentsService } from '../../../../services/studentsService'
import { EmptyItems } from '../../../../components/EmptyItems'
import { TableComponent } from '../../../../components/TableComponent'
import { Loading } from '../../../../components/Loading'
import { FormEdit } from './FormEdit'
import { AlertContext } from '../../../../contexts/alertContext'
import { useColumns } from './hooks/useColumns'

interface Props {
  subjectData: Subject
  open: boolean
  handleClose: () => void
}

interface Grade {
  _id: string
  firstGrade: number
  secondGrade: number
  totalGrade: number
}

export interface Student {
  _id: string
  name: string
  grades: Grade | Grade[]
}

export function ModalStudents({ open, handleClose, subjectData }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingGetStudents, setLoadingGetStudents] = useState<boolean>(true)
  const [students, setStudents] = useState<Student[]>([])
  const [studentToEdit, setStudentToEdit] = useState<any>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)

  console.log('STUDENTS', students)

  async function getStudentsBySubject() {
    setLoadingGetStudents(true)
    studentsService
      .getBySubject(subjectData?._id)
      .then((res) => {
        setStudents(res.data.items)
      })
      .catch((err) => {
        console.log('Erro ao buscar alunos, ' + err.response.data.message)
      })
      .finally(() => {
        setLoadingGetStudents(false)
      })
  }

  function onEditGrades(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    studentsService
      .updateGrades({
        studentId: studentToEdit?._id,
        subjectId: subjectData?._id,
        grades: studentToEdit?.grades,
      })
      .then(async (res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Notas atualizadas com sucesso ',
          type: 'success',
        })
        getStudentsBySubject()
        setStudentToEdit(undefined)
        setEditMode(false)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text:
            'Erro ao tentar editar as notas. ' + err?.response?.data?.message,
          type: 'error',
        })
        console.log(
          'Erro ao tentar editar notas. ',
          err?.response?.data?.message,
        )
      })
  }

  function handleEditGrades(student: Student) {
    setEditMode(true)
    setStudentToEdit(student)
  }

  const columns = useColumns({ handleEditGrades })

  useEffect(() => {
    getStudentsBySubject()
  }, [])

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={editMode ? onEditGrades : undefined}
      submitButtonText={editMode ? 'Confirmar edição' : ''}
      title="Notas"
      loading={loadingGetStudents}
      customStyle={{
        minWidth: '55%',
      }}
    >
      <div className={style.fieldsContainer}>
        {students?.length === 0 && loadingGetStudents && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading color="#cd1414" />
          </div>
        )}

        {students?.length > 0 && !editMode && (
          <TableComponent
            rows={students}
            columns={columns}
            loading={loadingGetStudents}
          />
        )}

        {students?.length === 0 && !loadingGetStudents && (
          <EmptyItems
            customStyle={{ boxShadow: 'none' }}
            text="Nenhum estudante cadastrado nesta disciplina"
          />
        )}

        {editMode && studentToEdit && (
          <FormEdit
            handleBack={() => {
              setEditMode(false)
            }}
            studentToEdit={studentToEdit}
            setStudentToEdit={setStudentToEdit}
          />
        )}
      </div>
    </ModalLayout>
  )
}
