import { ModalLayout } from '../../../../components/ModalLayout'
import { useState, useEffect } from 'react'
import { Subject } from '..'
import { gradesService } from '../../../../services/gradesService'
import { ListMobile } from '../../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { useColumns } from './hooks/useColumns'

interface Props {
  subjectData: Subject
  open: boolean
  handleClose: () => void
}

export interface Grade {
  _id: string
  student: {
    name: string
  }
  subject: {
    name: string
  }
}

export function ModalGrades({ open, handleClose, subjectData }: Props) {
  // const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [loadingGetGrades, setLoadingGetGrades] = useState<boolean>(true)
  const [grades, setGrades] = useState<Grade[]>([])

  function getGrades() {
    setLoadingGetGrades(true)
    gradesService
      .getAll(subjectData._id)
      .then((res) => {
        setGrades(res.data.items)
      })
      .catch((err) => {
        console.log(
          `Erro ao buscar notas - ${
            err?.response?.data?.message || err?.message
          }`,
        )
      })
      .finally(() => {
        setLoadingGetGrades(false)
      })
  }

  const columns = useColumns()
  const fieldsMobile = useFieldsMobile()

  useEffect(() => {
    getGrades()
  }, [])

  console.log('grade ', grades)

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      title="Notas"
      submitButtonText="Confirmar"
      loading={loadingGetGrades}
    >
      <ListMobile
        emptyText="Nenhum aluno encontrado"
        itemFields={fieldsMobile}
        collapseItems={columns}
        items={grades}
        loading={loadingGetGrades}
      />
    </ModalLayout>
  )
}
