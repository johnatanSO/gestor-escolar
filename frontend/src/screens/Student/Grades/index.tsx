import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { Column } from '../../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { Loading } from '../../../components/Loading'
import { studentsService } from '../../../services/studentsService'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function Grades() {
  const [grades, setGrades] = useState<Subject[]>([])
  const [loadingGrades, setLoadingGrades] = useState<boolean>(true)
  const router = useRouter()

  function getGrades() {
    setLoadingGrades(true)
    studentsService
      .getGrades()
      .then((res) => {
        setGrades(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ALUNOS, ', err)
      })
      .finally(() => {
        setLoadingGrades(false)
      })
  }

  useEffect(() => {
    getGrades()
  }, [router.query])

  const columns: Column[] = useColumns()

  return (
    <>
      {grades?.length > 0 && (
        <TableComponent
          loading={loadingGrades}
          columns={columns}
          rows={grades}
        />
      )}

      {grades?.length === 0 && loadingGrades && (
        <Loading size={30} color="#cd1414" />
      )}

      {grades?.length === 0 && !loadingGrades && (
        <EmptyItems text="Nenhuma nota encontrada" />
      )}
    </>
  )
}
