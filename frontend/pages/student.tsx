import { Student } from '../src/screens/Student'
import { usersService } from '../src/services/usersService'
import { PageProps } from './_app'

export default function StudentPage({ setTitle }: PageProps) {
  setTitle('Estudante')
  return (
    <>
      <Student />
    </>
  )
}

export function getServerSideProps(context: any) {
  const userInfo = usersService.getUserInfoByCookie(context)
  const hasPermition = userInfo.occupation === 'student'

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
