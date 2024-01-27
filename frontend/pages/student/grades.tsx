import { Grades } from '../../src/screens/Student/Grades'
import { tokenService } from '../../src/services/tokenService'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function GradesPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <Grades />
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
  const isStudent = userInfo?.occupation === 'student'
  if (!isStudent) {
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
