import { Subjects } from '../../src/screens/Teacher/InsertStudents'
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
  const isTeacher = userInfo?.occupation === 'teacher'
  if (!isTeacher) {
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
