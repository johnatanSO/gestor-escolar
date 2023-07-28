import { ModalLayout } from '../../../components/ModalLayout'
import { useState, useEffect } from 'react'
import style from './ModalStudents.module.scss'
import { Subject } from '..'
import { studentsService } from '../../../services/studentsService'
import { EmptyItems } from '../../../components/EmptyItems'

interface Props {
  subjectData: Subject
  open: boolean
  handleClose: () => void
}

interface Student {
  _id: string
  name: string
  grades: {
    _id: string
    firstGrade: number
    secondGrade: number
    totalGrade: number
  }
}

export function ModalStudents({ open, handleClose, subjectData }: Props) {
  const [loadingGetStudents, setLoadingGetStudents] = useState<boolean>(true)
  const [students, setStudents] = useState<Student[]>([])

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
            const grades = student.grades.find(
              (grade: any) => grade?.idSubject === subjectData?._id,
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

  useEffect(() => {
    getStudentsBySubject()
  }, [])

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      title="Notas"
      loading={loadingGetStudents}
    >
      <div className={style.fieldsContainer}>
        {students?.length === 0 && loadingGetStudents && 'CARREGANDO...'}
        {students?.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota final</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student) => {
                return (
                  <tr key={student._id}>
                    <td>{student?.name || '--'}</td>

                    <td>{student?.grades?.firstGrade || '--'}</td>
                    <td>{student?.grades?.secondGrade || '--'}</td>
                    <td>{student?.grades?.totalGrade || '--'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        {students?.length === 0 && !loadingGetStudents && (
          <EmptyItems
            customStyle={{ boxShadow: 'none' }}
            text="Nenhum estudante cadastrado nesta disciplina"
          />
        )}
      </div>
      <table className={style.fieldsContainer}></table>
    </ModalLayout>
  )
}
