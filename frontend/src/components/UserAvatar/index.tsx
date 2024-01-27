import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './UserAvatar.module.scss'
import teacherImage from '../../../public/assets/teacher.png'
import studentImage from '../../../public/assets/student.png'
import { usersService } from '../../services/usersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

interface UserData {
  name: string
  avatar: string
}

type Props = {
  occupation: string
}

export function UserAvatar({ occupation }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [avatarImage, setAvatarImage] = useState<any>(null)

  function getAvatarImage() {
    if (userData?.avatar) return userData?.avatar
    if (occupation === 'teacher') return teacherImage
    if (occupation === 'student') return studentImage
  }

  function getCurrentUserInfo() {
    const newUserData = usersService.getUserInfo()
    setUserData(newUserData)
  }

  function handleClickEditAvatar() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = (event: any) => {
      setAvatarImage(event.target.files[0])
    }

    inputFile.click()
  }

  useEffect(() => {
    getCurrentUserInfo()
  }, [])

  useEffect(() => {
    if (avatarImage) {
      usersService
        .updateAvatarImage({ avatarImage })
        .then(({ data: { user } }) => {
          usersService.saveUser(user)
          setUserData(user)
        })
        .catch((err) => {
          console.log('err', err.response.data.message)
        })
    }
  }, [avatarImage])

  return (
    <div className={style.avatarContainer}>
      <div className={style.imageContainer}>
        <div
          className={style.editAvatarContainer}
          onClick={handleClickEditAvatar}
        >
          <FontAwesomeIcon icon={faCamera} className={style.icon} />
          <span>Editar avatar</span>
        </div>

        <Image
          loading='lazy'
          src={getAvatarImage() || ''}
          layout="fill"
          alt="user avatar"
          width={512}
          height={512}
          className={style.image}
        />
      </div>
      <h3>{userData?.name || '--'}</h3>
    </div>
  )
}
