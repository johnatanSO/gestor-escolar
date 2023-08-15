import { StudentsWarnings } from '../../src/screens/Teacher/StudentsWarnings'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function StudentsWarningsPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <StudentsWarnings />
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
