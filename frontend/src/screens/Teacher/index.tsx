import { useState, useEffect } from 'react'
import style from './Teacher.module.scss'
import Image from 'next/image'
import teacherImage from '../../../public/assets/teacher.png'
import notesImage from '../../../public/assets/notepad.png'
import warningImage from '../../../public/assets/warning.png'
import timetableImage from '../../../public/assets/timetable.png'
import registerImage from '../../../public/assets/register.png'
import { usersService } from '../../services/usersService'
import { ButtonComponent } from '../../components/ButtonComponent'
import { useRouter } from 'next/router'

export function Teacher() {
  const router = useRouter()
  const [teacherData, setTeacherData] = useState<any>(undefined)
  const buttonsList: any[] = [
    {
      image: notesImage,
      alt: 'Botão de notas',
      title: 'Alunos',
    },
    { image: warningImage, alt: 'Botão de dvertências', title: 'Advertências' },
    { image: timetableImage, alt: 'Botão de faltas', title: 'Faltas' },
    {
      image: registerImage,
      alt: 'Botão de registro',
      title: 'Disciplinas',
      onClickCallback: () => {
        router.push('/subjects')
      },
    },
  ]

  useEffect(() => {
    const teacherData = usersService.getUserInfo()
    setTeacherData(teacherData)
  }, [])

  return (
    <>
      <div className={style.avatarContainer}>
        <div className={style.imageContainer}>
          <Image
            src={teacherImage}
            alt="teacher icon"
            className={style.image}
          />
        </div>
        <h3>{teacherData?.name || '--'}</h3>
      </div>

      <ul className={style.buttonsContainer}>
        {buttonsList?.map(({ image, alt, title, onClickCallback }, key) => {
          return (
            <ButtonComponent
              onClickCallback={onClickCallback}
              image={image}
              alt={alt}
              title={title}
              key={key}
            />
          )
        })}
      </ul>
    </>
  )
}
