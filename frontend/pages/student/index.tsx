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

  return {
    ...(await usersService.checkPermission(context)),
  }
}
