import { useEffect, useState } from 'react'
import { TableComponent } from '../../../../src/components/TableComponent'
import { useColumns } from './hooks/useColumns'
import { gradesService } from '../../../services/gradesService'
import style from './Grades.module.scss'
import { ListMobile } from '../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export interface Grade {
  _id: string
  subject: {
    name: string
  }
  firstGrade: number
  secondGrade: number
}

export function Grades() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loadingGrades, setLoadingGrades] = useState<boolean>(true)

  const columns = useColumns()
  const fieldsMobile = useFieldsMobile()

  function getGrades() {
    setLoadingGrades(true)
    gradesService
      .getGradesByStudent()
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
  }, [])

  return (
    <>
      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingGrades}
          columns={columns}
          rows={grades}
          emptyText="Você não está cadastrado em nenhuma disciplina"
        />
      </div>
      <div className={style.viewMobile}>
        <ListMobile
          collapseItems={columns}
          items={grades}
          emptyText="Você não está cadastrado em nenhuma disciplina"
          loading={loadingGrades}
          itemFields={fieldsMobile}
        />
      </div>
    </>
  )
}
