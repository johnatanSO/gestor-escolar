import { useEffect, useState } from 'react'
import { TableComponent } from '../../../components/TableComponent'
import { Column } from '../../../models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../components/EmptyItems'
import { useRouter } from 'next/router'
import { Loading } from '../../../components/Loading'
import { warningsService } from '../../../services/warningsService'
import { usersService } from '../../../services/usersService'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function Warnings() {
  const [warnings, setWarnings] = useState<Subject[]>([])
  const [loadingWarnings, setLoadingWarnings] = useState<boolean>(true)
  const router = useRouter()

  function getWarnings() {
    setLoadingWarnings(true)
    const idStudent = usersService.getUserInfo()._id

    warningsService
      .getAll(idStudent)
      .then((res) => {
        setWarnings(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ADVERTÊNCIAS, ', err)
      })
      .finally(() => {
        setLoadingWarnings(false)
      })
  }

  useEffect(() => {
    getWarnings()
  }, [router.query])

  const columns: Column[] = useColumns()

  return (
    <>
      {warnings?.length > 0 && (
        <TableComponent
          loading={loadingWarnings}
          columns={columns}
          rows={warnings}
        />
      )}

      {warnings?.length === 0 && loadingWarnings && (
        <Loading size={30} color="#cd1414" />
      )}

      {warnings?.length === 0 && !loadingWarnings && (
        <EmptyItems text="Nenhuma advertência encontrada" />
      )}
    </>
  )
}
