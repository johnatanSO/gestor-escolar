import { TeacherHomeScreen } from '../../src/screens/Teacher/TeacherHomeScreen'
import { usersService } from '../../src/services/usersService'
import { PageProps } from '../_app'

export default function TeacherPage({
  setTitle,
  setShowBackButton,
}: PageProps) {
  setTitle('Professor')
  setShowBackButton(false)
  return (
    <>
      <TeacherHomeScreen />
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
  const isTeacher = userInfo?.occupation === 'teacher'
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
