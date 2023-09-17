import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './UserAvatar.module.scss'
import teacherImage from '../../../public/assets/teacher.png'
import { usersService } from '../../services/usersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

interface UserData {
  name: string
  avatar: string
}

export function UserAvatar() {
  const [userData, setUserData] = useState<UserData | undefined>(undefined)

  function handleEditAvatar() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.accept = 'image/png, image/jpeg'
    inputFile.click()
    console.log('inputFile', inputFile)
  }

  useEffect(() => {
    const teacherData = usersService.getUserInfo()
    setUserData(teacherData)
  }, [])

  return (
    <div className={style.avatarContainer}>
      <div className={style.imageContainer}>
        <div className={style.editAvatarContainer} onClick={handleEditAvatar}>
          <FontAwesomeIcon icon={faCamera} className={style.icon} />
          <span>Editar avatar</span>
        </div>

        <Image
          src={userData?.avatar || teacherImage}
          alt="user avatar"
          className={style.image}
        />
      </div>
      <h3>{userData?.name || '--'}</h3>
    </div>
  )
}
