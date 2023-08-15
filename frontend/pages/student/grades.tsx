import { Grades } from '../../src/screens/Student/Grades'
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
