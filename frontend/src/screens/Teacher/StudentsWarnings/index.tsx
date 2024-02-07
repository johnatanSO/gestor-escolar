import { studentsService } from '../../../services/studentsService'
import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { ModalWarnings, Warning } from './ModalWarnings'
import style from './StudentsWarnings.module.scss'
import { ListMobile } from '../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export interface Student {
  _id: string
  name: string
  warnings: Warning[]
}

export function StudentsWarnings() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [modalWarningsOpened, setModalWarningsOpened] = useState<boolean>(false)
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
    setSelectedStudent(student)
  }

  const columns = useColumns({
    handleOpenWarnings,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
        />
      </div>
      <div className={style.viewMobile}>
        <ListMobile
          loading={loadingStudents}
          collapseItems={columns}
          itemFields={fieldsMobile}
          emptyText="Nenhum aluno encontrado"
          items={students}
        />
      </div>

      {modalWarningsOpened && selectedStudent && (
        <ModalWarnings
          studentData={selectedStudent}
          open={modalWarningsOpened}
          getStudents={getStudents}
          handleClose={() => {
            setModalWarningsOpened(false)
            setSelectedStudent(null)
          }}
        />
      )}
    </>
  )
}
