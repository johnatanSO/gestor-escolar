import { studentsService } from '../../../services/studentsService'
import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { Column } from '../../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { ModalWarnings, Warning } from './ModalWarnings'
import { Loading } from '../../../components/Loading'

export interface Student {
  _id: string
  name: string
  warnings: Warning[]
}

export function StudentsWarnings() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined,
  )
  const [modalWarningsOpened, setModalWarningsOpened] = useState<boolean>(true)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)
  const router = useRouter()

  function getStudents() {
    setLoadingStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        setStudents(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ALUNOS, ', err)
      })
      .finally(() => {
        setLoadingStudents(false)
      })
  }

  useEffect(() => {
    getStudents()
  }, [router.query])

  function handleOpenWarnings(student: Student) {
    setModalWarningsOpened(true)
    console.log('student', student)
    setSelectedStudent(student)
  }

  const columns: Column[] = useColumns({
    handleOpenWarnings,
  })

  return (
    <>
      {students?.length > 0 && (
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
        />
      )}

      {students?.length === 0 && loadingStudents && (
        <Loading size={30} color="#cd1414" />
      )}

      {students?.length === 0 && !loadingStudents && (
        <EmptyItems text="Nenhum aluno foi encontrado" />
      )}

      {modalWarningsOpened && selectedStudent && (
        <ModalWarnings
          studentData={selectedStudent}
          setStudentData={setSelectedStudent}
          open={modalWarningsOpened}
          handleClose={() => {
            setModalWarningsOpened(false)
            setSelectedStudent(undefined)
          }}
        />
      )}
    </>
  )
}
