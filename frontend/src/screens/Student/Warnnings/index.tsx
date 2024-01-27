import { useEffect, useState } from 'react'
import { TableComponent } from '../../../components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { warningsService } from '../../../services/warningsService'
import { usersService } from '../../../services/usersService'
import style from './Warnings.module.scss'
import { ListMobile } from '../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export interface Subject {
  _id: string
  name: string
  students: string[]
}

export function Warnings() {
  const [warnings, setWarnings] = useState<Subject[]>([])
  const [loadingWarnings, setLoadingWarnings] = useState<boolean>(true)

  const columns = useColumns()
  const fieldsMobile = useFieldsMobile()

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
  }, [])

  return (
    <>
      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingWarnings}
          columns={columns}
          rows={warnings}
          emptyText="Você não possui advertências"
        />
      </div>
      <div className={style.viewMobile}>
        <ListMobile 
          collapseItems={columns} 
          items={warnings} 
          emptyText="Você não possui advertências" 
          loading={loadingWarnings}
          itemFields={fieldsMobile}
        />
      </div>
    </>
  )
}
