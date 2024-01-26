import { ModalLayout } from '../../../../components/ModalLayout'
import { useState, useEffect, FormEvent, useContext } from 'react'
import { Subject } from '..'
import { gradesService } from '../../../../services/gradesService'
import { ListMobile } from '../../../../components/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { useColumns } from './hooks/useColumns'
import { TableComponent } from '../../../../components/TableComponent'
import style from './ModalGrades.module.scss'
import { FormEditGrade } from './FormEditGrade'
import { AlertContext } from '../../../../contexts/alertContext'

interface Props {
  subjectData: Subject
  open: boolean
  handleClose: () => void
}

export interface Grade {
  _id: string
  firstGrade: number
  secondGrade: number
  student: {
    name: string
  }
  subject: {
    name: string
  }
}

export function ModalGrades({ open, handleClose, subjectData }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [loadingGetGrades, setLoadingGetGrades] = useState<boolean>(true)
  const [loadingUpdateGrades, setLoadingUpdateGrade] = useState<boolean>(false)
  const [editGradeMode, setEditGradeMode] = useState<boolean>(false)
  const [gradeToEditData, setGradeToEditData] = useState<Grade | null>(null)
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

  function handleEditGrades(grade: Grade) {
    setEditGradeMode(true)
    setGradeToEditData(grade)
  }

  function onUpdateGrades(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!gradeToEditData) return

    setLoadingUpdateGrade(true)
    gradesService
      .update(gradeToEditData)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Notas atualizadas com suceso',
          type: 'success',
        })
        getGrades()
        setEditGradeMode(false)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar notas - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateGrade(false)
      })
  }

  const columns = useColumns({ handleEditGrades })
  const fieldsMobile = useFieldsMobile()

  useEffect(() => {
    getGrades()
  }, [])

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      title="Notas"
      submitButtonText={editGradeMode ? 'Confirmar' : ''}
      onSubmit={editGradeMode ? onUpdateGrades : undefined}
      loading={loadingUpdateGrades}
    >
      {editGradeMode && gradeToEditData && (
        <FormEditGrade
          gradeToEditData={gradeToEditData}
          setGradeToEditData={setGradeToEditData}
          handleBack={() => {
            setEditGradeMode(false)
            setGradeToEditData(null)
          }}
        />
      )}

      {!editGradeMode && (
        <>
          <div className={style.viewDesktop}>
            <TableComponent
              rows={grades}
              loading={loadingGetGrades}
              columns={columns}
              emptyText="Nenhum aluno cadastrado na disciplina"
            />
          </div>

          <div className={style.viewMobile}>
            <ListMobile
              emptyText="Nenhum aluno cadastrado na disciplina"
              itemFields={fieldsMobile}
              collapseItems={columns}
              items={grades}
              loading={loadingGetGrades}
            />
          </div>
        </>
      )}
    </ModalLayout>
  )
}
