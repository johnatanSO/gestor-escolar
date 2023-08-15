import { StudentsGrades } from '../../src/screens/Teacher/StudentsGrades'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function StudentsGradesPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <StudentsGrades />
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
