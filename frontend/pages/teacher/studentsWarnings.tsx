import { StudentsWarnings } from '../../src/screens/Teacher/StudentsWarnings'
import { tokenService } from '../../src/services/tokenService'
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
  const isTeacher = userInfo?.occupation === 'teacher'
  if (!isTeacher) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}
