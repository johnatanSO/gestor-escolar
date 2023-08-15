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

export function getServerSideProps(context: any) {
  const userInfo = usersService.getUserInfoByCookie(context)
  const hasPermition = userInfo?.occupation === 'teacher'

  if (!hasPermition) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  return {
    props: {},
  }
}
