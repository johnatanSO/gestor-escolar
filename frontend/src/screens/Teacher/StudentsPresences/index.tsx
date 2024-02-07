import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'

import { useColumns } from './hooks/useColumns'
import { ModalPresences } from './ModalPresences'
import style from './StudentsPresences.module.scss'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { ListMobile } from '../../../components/ListMobile'
import { studentsService } from '../../../services/studentsService'
import { TableComponent } from '../../../../src/components/TableComponent'
import { HeaderPage } from '../../../components/HeaderPage'
import { CustomTextField } from '../../../components/CustomTextField'
import { Student } from './interfaces/Student'
import { callsService } from '../../../services/callsService'
import { AlertContext } from '../../../contexts/alertContext'
import { CallDate } from './interfaces/CallDate'

export function StudentsPresences() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [students, setStudents] = useState<Student[]>([])
  const [callInitiated, setCallInitiated] = useState<boolean>(false)
  const [callDate, setCallDate] = useState<CallDate | null>(null)

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [modalPresencesOpened, setModalPresencesOpened] =
    useState<boolean>(false)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)

  const [dateNow, setDateNow] = useState<string>(dayjs().format('YYYY-MM-DD'))

  function getStudents() {
    setLoadingStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        const formatedStudents = res.data.items.map((student: Student) => {
          return {
            ...student,
            present: false,
          }
        })

        setStudents(formatedStudents)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR ALUNOS, ', err)
      })
      .finally(() => {
        setLoadingStudents(false)
      })
  }

  function getAnotherCall() {
    callsService
      .getByDate(dateNow)
      .then((res) => {
        const presences = res.data.item.presences

        const newStudents = students.map((student) => {
          student.present = presences.find(
            (presence: any) =>
              presence.student === student._id && presence.present === true,
          )

          return student
        })

        setStudents(newStudents)
        setCallDate(res.data.item)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR PRESENÇAS', err)
      })
  }

  function initCall() {
    setCallInitiated(true)
  }

  function editCall() {}

  function saveCall() {
    callsService
      .updateCall({ idCall: callDate?._id || '', students })
      .then(() => {
        setCallInitiated(false)
      })
      .catch((err) => {
        console.log('ERRO AO SALVAR CHAMADA', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar salvar a chamada - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  function finalizeCall() {
    callsService
      .saveCall(students)
      .then(() => {
        setCallInitiated(false)
      })
      .catch((err) => {
        console.log('ERRO AO FINALIZAR CHAMADA', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar finalizar a chamada - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  function handleCheckStudent(idStudent: string, checked: boolean) {
    const newStudents = students.map((student) => {
      return {
        ...student,
        present: checked,
      }
    })

    setStudents(newStudents)
  }

  useEffect(() => {
    getStudents()
  }, [])

  useEffect(() => {
    getAnotherCall()
  }, [dateNow])

  function handleOpenPresences(student: Student) {
    setModalPresencesOpened(true)
    setSelectedStudent(student)
  }

  const columns = useColumns({
    handleOpenPresences,
    handleCheckStudent,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        InputFilter={
          <CustomTextField
            label="Data"
            size="small"
            type="date"
            value={dateNow}
            onChange={(event) => {
              setDateNow(event?.target.value)
            }}
          />
        }
        buttonText={
          callDate
            ? 'Editar chamada'
            : !callInitiated
            ? 'Iniciar nova chamada'
            : 'Salvar chamada'
        }
        onClickFunction={
          callDate && callInitiated
            ? saveCall
            : callDate
            ? editCall
            : !callInitiated
            ? initCall
            : finalizeCall
        }
      />

      <div
        style={!callInitiated ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
        className={style.viewDesktop}
      >
        <TableComponent
          loading={loadingStudents}
          columns={columns}
          rows={students}
        />
      </div>
      <div
        style={!callInitiated ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
        className={style.viewMobile}
      >
        <ListMobile
          loading={loadingStudents}
          collapseItems={columns}
          itemFields={fieldsMobile}
          emptyText="Nenhum aluno encontrado"
          items={students}
        />
      </div>

      {modalPresencesOpened && selectedStudent && (
        <ModalPresences
          studentData={selectedStudent}
          open={modalPresencesOpened}
          getStudents={getStudents}
          handleClose={() => {
            setModalPresencesOpened(false)
            setSelectedStudent(null)
          }}
        />
      )}
    </>
  )
}
