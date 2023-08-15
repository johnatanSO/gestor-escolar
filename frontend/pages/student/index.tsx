import { StudentHomeScreen } from '../../src/screens/Student/StudentHomeScreen'
import { usersService } from '../../src/services/usersService'
import { PageProps } from '../_app'

export default function StudentPage({ setTitle }: PageProps) {
  setTitle('Estudante')
  return (
    <>
      <StudentHomeScreen />
    </>
  )
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
  const isTeacher = userInfo?.occupation === 'student'
  if (!isTeacher) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}
