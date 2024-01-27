import { useEffect } from 'react'
import { StudentHomeScreen } from '../src/screens/Student/StudentHomeScreen'
import { TeacherHomeScreen } from '../src/screens/Teacher/TeacherHomeScreen'
import { tokenService } from '../src/services/tokenService'
import { usersService } from '../src/services/usersService'

interface PageProps {
  userInfo: {
    occupation: string
  }
  setShowBackButton: (show: boolean) => void
}

export default function HomePage({ userInfo, setShowBackButton}: PageProps) {
  useEffect(() => {
    setShowBackButton(false)
  }, [])
  
  if (userInfo.occupation === 'student') {
    return <StudentHomeScreen />
  }
  if (userInfo.occupation === 'teacher') {
    return <TeacherHomeScreen />
  }
}


export async function getServerSideProps(context: any) {
  const hasSession = await tokenService.getSession(context)
  if (!hasSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  const userInfo = usersService.getUserInfoByCookie(context)

  return {
    props: {
      userInfo,
    },
  }
}
