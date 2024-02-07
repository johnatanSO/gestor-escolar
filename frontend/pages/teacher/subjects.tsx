import { Subjects } from '../../src/screens/Teacher/Subjects'
import { tokenService } from '../../src/services/tokenService'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function SubjectsPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <Subjects />
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
