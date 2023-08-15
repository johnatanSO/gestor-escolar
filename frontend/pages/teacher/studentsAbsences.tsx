import { StudentsAbsences } from '../../src/screens/Teacher/StudentsAbsences'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function StudentsAbsencesPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <StudentsAbsences />
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
