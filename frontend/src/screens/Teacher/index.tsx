import style from './Teacher.module.scss'
import Image from 'next/image'
import teacherImage from '../../../public/assets/teacher.png'
import notesImage from '../../../public/assets/notepad.png'
import warningImage from '../../../public/assets/warning.png'
import timetableImage from '../../../public/assets/timetable.png'
import registerImage from '../../../public/assets/register.png'

export function Teacher() {
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
        <h3>nome</h3>
      </div>

      <ul className={style.buttonsContainer}>
        <li>
          <div className={style.imageContainer}>
            <Image src={notesImage} alt="Notas icon" className={style.image} />
          </div>
          <h4>Notas</h4>
        </li>
        <li>
          <div className={style.imageContainer}>
            <Image
              src={warningImage}
              alt="Advertências icon"
              className={style.image}
            />
          </div>
          <h4>Advertências</h4>
        </li>
        <li>
          <div className={style.imageContainer}>
            <Image
              src={timetableImage}
              alt="Faltas icon"
              className={style.image}
            />
          </div>
          <h4>Faltas</h4>
        </li>
        <li>
          <div className={style.imageContainer}>
            <Image
              src={registerImage}
              alt="Cadastro icon"
              className={style.image}
            />
          </div>
          <h4>Gerenciar alunos</h4>
        </li>
      </ul>
    </>
  )
}
