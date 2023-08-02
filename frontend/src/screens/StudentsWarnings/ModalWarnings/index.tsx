import { ModalLayout } from '../../../components/ModalLayout'
import style from './ModalAddStudents.module.scss'
import { Student } from '..'
import { EmptyItems } from '../../../components/EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface Props {
  studentData: Student
  open: boolean
  handleClose: () => void
}

export interface Warning {
  title: ''
  description: ''
  date: ''
  uniqueId: string
}

export function ModalWarnings({ open, handleClose, studentData }: Props) {
  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={undefined}
      title=""
      submitButtonText="Confirmar"
      loading={false}
    >
      <>
        <button type="button" className={style.buttonNewWarning}>
          <FontAwesomeIcon className={style.icon} icon={faPlus} />
          Nova advertência
        </button>
        <ul className={style.fieldsContainer}>
          {studentData?.warnings?.length === 0 && (
            <EmptyItems text="Aluno não possui advertências" />
          )}
          {studentData?.warnings?.map((warning) => {
            return (
              <li key={warning.uniqueId}>
                <span>{warning?.date}</span>
                <span>{warning?.title}</span>
              </li>
            )
          })}
        </ul>
      </>
    </ModalLayout>
  )
}
