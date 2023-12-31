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
  const [avatarImage, setAvatarImage] = useState<any>(null)

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
        .then(async (res) => {
          const response: any = await usersService.getCurrentUserInfo()
          usersService.saveUser(response.data)
          setUserData(response.data.item)
        })
        .catch((err) => {
          console.log('err', err.response.data.message)
        })
    }
  }, [avatarImage])

  const avatarUrl = userData?.avatar
    ? process.env.NEXT_PUBLIC_BASE_URL + userData?.avatar
    : teacherImage.src

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
          loader={() => avatarUrl}
          src={avatarUrl}
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
