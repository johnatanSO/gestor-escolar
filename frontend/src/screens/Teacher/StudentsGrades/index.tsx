import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { ModalStudents } from './ModalStudents'
import { subjectsService } from '../../../services/subjectsService'
import { Loading } from '../../../components/Loading'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function StudentsGrades() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subjectData, setSubjectData] = useState<Subject | undefined>(undefined)
  const [loadingSubjects, setLoadingSubjects] = useState<boolean>(true)
  const [modalStudentsOpened, setModalStudentsOpened] = useState<boolean>(true)
  const router = useRouter()

  function getSubjects() {
    setLoadingSubjects(true)
    subjectsService
      .getAll()
      .then((res) => {
        setSubjects(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ALUNOS, ', err)
      })
      .finally(() => {
        setLoadingSubjects(false)
      })
  }

  useEffect(() => {
    getSubjects()
  }, [router.query])

  function handleShowStudents(subject: Subject) {
    setModalStudentsOpened(true)
    setSubjectData(subject)
  }

  const columns = useColumns({ handleShowStudents })

  return (
    <>
      {subjects?.length > 0 && (
        <TableComponent
          loading={loadingSubjects}
          columns={columns}
          rows={subjects}
        />
      )}

      {subjects?.length === 0 && loadingSubjects && (
        <Loading size={30} color="#cd1414" />
      )}

      {subjects?.length === 0 && !loadingSubjects && (
        <EmptyItems text="Nenhuma disciplina encontrada" />
      )}

      {subjectData && modalStudentsOpened && (
        <ModalStudents
          open={modalStudentsOpened}
          subjectData={subjectData}
          handleClose={() => {
            setModalStudentsOpened(false)
            setSubjectData(undefined)
          }}
        />
      )}
    </>
  )
}
