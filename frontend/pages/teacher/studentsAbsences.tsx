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

export function getServerSideProps(context: any) {
  const userInfo = usersService.getUserInfoByCookie(context)
  const hasPermition = userInfo.occupation === 'teacher'

  if (!hasPermition) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  return {
    props: {},
  }
}
