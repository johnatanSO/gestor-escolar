import style from './StudentHomeScreen.module.scss'
import Image from 'next/image'
import studentImage from '../../../../public/assets/student.png'
import notesImage from '../../../../public/assets/notepad.png'
import warningImage from '../../../../public/assets/warning.png'
import timetableImage from '../../../../public/assets/timetable.png'
import { usersService } from '../../../services/usersService'
import { useEffect, useState } from 'react'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { useRouter } from 'next/router'
import { ButtonHomeScreen } from '../../../models/ButtonHomeScreen'
import { UserAvatar } from '../../../components/UserAvatar'

interface Student {
  name: string
}

export function StudentHomeScreen() {
  const [studentData, setStudentData] = useState<Student | undefined>(undefined)
  const router = useRouter()
  const buttonsList: ButtonHomeScreen[] = [
    {
      image: notesImage,
      alt: 'Botão de notas',
      title: 'Notas',
      onClickCallback: () => {
        router.push('/student/grades')
      },
    },
    {
      image: warningImage,
      alt: 'Botão de dvertências',
      title: 'Advertências',
      onClickCallback: () => {
        router.push('/student/warnings')
      },
    },
    {
      image: timetableImage,
      alt: 'Botão de faltas',
      title: 'Faltas',
      onClickCallback: () => {},
      disabled: true,
    },
  ]

  useEffect(() => {
    const studentData = usersService.getUserInfo()
    setStudentData(studentData)
  }, [])

  return (
    <>
      <UserAvatar occupation="student" />

      <div className={style.buttonsContainer}>
        {buttonsList?.map(
          ({ image, alt, title, onClickCallback, disabled = false }, key) => {
            return (
              <ButtonComponent
                onClickCallback={onClickCallback}
                image={image}
                alt={alt}
                title={title}
                key={key}
                disabled={disabled}
              />
            )
          },
        )}
      </div>
    </>
  )
}
