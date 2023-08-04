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
