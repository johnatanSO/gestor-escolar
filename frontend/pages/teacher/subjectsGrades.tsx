import { SubjectsGrades } from '../../src/screens/SubjectsGrades'
import { usersService } from '../../src/services/usersService'
import { PageProps } from './../_app'

export default function SubjectsGradesPage({ setShowBackButton }: PageProps) {
  setShowBackButton(true)
  return (
    <>
      <SubjectsGrades />
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
