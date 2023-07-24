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

export async function getServerSideProps() {
  const userInfo = await usersService.getUserInfo()
  const hasPermition = userInfo.occupation === 'student'
  if (!hasPermition) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
}
