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
