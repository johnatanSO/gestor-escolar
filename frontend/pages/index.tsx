import { StudentHomeScreen } from '../src/screens/Student/StudentHomeScreen'
import { TeacherHomeScreen } from '../src/screens/Teacher/TeacherHomeScreen'
import { usersService } from '../src/services/usersService'

interface PageProps {
  userInfo: {
    occupation: string
  }
}

export default function HomePage({ userInfo }: PageProps) {
  if (userInfo.occupation === 'student') {
    return <StudentHomeScreen />
  }
  if (userInfo.occupation === 'teacher') {
    return <TeacherHomeScreen />
  }
}

export async function getServerSideProps(context: any) {
  const hasSession = await usersService.getSession(context)
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
