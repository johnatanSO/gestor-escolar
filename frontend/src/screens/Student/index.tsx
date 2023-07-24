import style from './Student.module.scss'
import Image from 'next/image'
import studentImage from '../../../public/assets/student.png'
import notesImage from '../../../public/assets/notepad.png'
import warningImage from '../../../public/assets/warning.png'
import timetableImage from '../../../public/assets/timetable.png'

export function Student() {
  return (
    <>
      <div className={style.avatarContainer}>
        <div className={style.imageContainer}>
          <Image
            src={studentImage}
            alt="student icon"
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
      </ul>
    </>
  )
}
