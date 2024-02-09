import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'

import { ModalPresences } from './ModalPresences'
import style from './StudentsPresences.module.scss'
import { studentsService } from '../../../services/studentsService'
import { HeaderPage } from '../../../components/HeaderPage'
import { CustomTextField } from '../../../components/CustomTextField'
import { Student } from './interfaces/Student'
import { callsService } from '../../../services/callsService'
import { AlertContext } from '../../../contexts/alertContext'
import { CallDate } from './interfaces/CallDate'
import { ListStudents } from './partials/ListStudents'

export function StudentsPresences() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [students, setStudents] = useState<Student[]>([])
  const [callInitiated, setCallInitiated] = useState<boolean>(false)
  const [callDate, setCallDate] = useState<CallDate | null>(null)

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [modalPresencesOpened, setModalPresencesOpened] =
    useState<boolean>(false)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)
  const [loadingGetCall, setLoadingGetCall] = useState<boolean>(true)

  const [dateNow, setDateNow] = useState<string>(dayjs().format('YYYY-MM-DD'))

  function getStudents() {
    setLoadingStudents(true)
    studentsService
      .getAll()
      .then((res) => {
        const formatedStudents = res.data.items.map((student: Student) => {
          student.present = false
          return student
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

  function getCallByDate() {
    setLoadingGetCall(true)
    callsService
      .getByDate(dateNow)
      .then((res) => {
        const call = res.data.item

        if (!call) {
          setCallDate(null)
          return
        }

        setCallDate(call)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR CHAMADA', err)
      })
      .finally(() => {
        setLoadingGetCall(false)
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
      .finalizeCall(students, dateNow)
      .then(() => {
        setCallInitiated(false)

        getCallByDate()
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
    if (dateNow) {
      getCallByDate()
    }
  }, [dateNow])

  useEffect(() => {
    const newStudents = [...students]
    newStudents.map((student) => {
      student.present = !!callDate?.presences.find((presence) => {
        return presence.idStudent === student._id && presence.present
      })
      return student
    })

    setStudents(newStudents)
  }, [callDate])

  function handleOpenPresences(student: Student) {
    setModalPresencesOpened(true)
    setSelectedStudent(student)
  }

  const disabled = !callInitiated

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
            : callInitiated
            ? 'Finalizar chamada'
            : 'Iniciar chamada'
        }
        onClickFunction={
          callDate && callInitiated
            ? saveCall
            : callDate
            ? editCall
            : callInitiated
            ? finalizeCall
            : initCall
        }
        customButtonStyle={{
          background: callDate ? '#31a2ff' : callInitiated ? '#00b37e' : '',
        }}
      />

      <div
        style={disabled ? { pointerEvents: 'none', opacity: 0.4 } : {}}
        className={style.listContainer}
      >
        <ListStudents
          handleOpenPresences={handleOpenPresences}
          handleCheckStudent={handleCheckStudent}
          loading={loadingGetCall && loadingStudents}
          students={students}
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
