import { InsertStudents } from '../../src/screens/Teacher/InsertStudents'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function NewSubjectPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <InsertStudents />
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
