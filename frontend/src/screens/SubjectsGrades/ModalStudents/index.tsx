import { ModalLayout } from '../../../components/ModalLayout'
import { useState, useEffect, FormEvent } from 'react'
import style from './ModalStudents.module.scss'
import { Subject } from '..'
import { studentsService } from '../../../services/studentsService'
import { EmptyItems } from '../../../components/EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { TableComponent } from '../../../components/TableComponent'
import { CellFunctionParams } from '../../../models/columns'
import { Loading } from '../../../components/Loading'
import { FormEdit } from './FormEdit'

interface Props {
  subjectData: Subject
  open: boolean
  handleClose: () => void
}

export interface Student {
  _id: string
  name: string
  grades: {
    _id: string
    firstGrade: number
    secondGrade: number
    totalGrade: number
  }[]
}

export function ModalStudents({ open, handleClose, subjectData }: Props) {
  const [loadingGetStudents, setLoadingGetStudents] = useState<boolean>(true)
  const [students, setStudents] = useState<Student[]>([])
  const [studentToEdit, setStudentToEdit] = useState<any>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)

  function getStudentsBySubject() {
    setLoadingGetStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        const studentsIncludesInSubject = res.data.items
          .filter((student: Student) =>
            subjectData.students.includes(student._id),
          )
          .map((student: any) => {
            const grades = student?.grades?.find(
              (grade: any) => grade?._id === subjectData?._id,
            )
            return {
              name: student?.name,
              grades,
            }
          })
        setStudents(studentsIncludesInSubject)
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
      .then(() => {})
      .catch(() => {})
  }

  function handleEditGrades(student: Student) {
    setEditMode(true)
    setStudentToEdit(student)
  }

  const columns = [
    {
      field: 'code',
      headerName: 'Código',
      valueFormatter: (params: CellFunctionParams) => params?.value || '--',
    },
    {
      field: 'name',
      headerName: 'Aluno',
      valueFormatter: (params: CellFunctionParams) => params?.value || '--',
    },
    {
      field: 'grades',
      headerName: 'Nota 1',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.firstNote || 0,
    },
    {
      field: 'grades',
      headerName: 'Nota 2',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.secondNote || 0,
    },
    {
      field: 'grades',
      headerName: 'Final',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.totalNote || 0,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      valueFormatter: (params: CellFunctionParams) => (
        <FontAwesomeIcon
          onClick={() => {
            handleEditGrades(params?.data)
          }}
          icon={faPen}
          className={style.iconEdit}
        />
      ),
    },
  ]

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
          <Loading color="#cd1414" />
        )}

        {students?.length > 0 && !editMode && (
          <TableComponent rows={students} columns={columns} loading={false} />
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
              getStudentsBySubject()
            }}
            studentToEdit={studentToEdit}
            setStudentToEdit={setStudentToEdit}
          />
        )}
      </div>
    </ModalLayout>
  )
}
