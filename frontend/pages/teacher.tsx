import { Teacher } from '../src/screens/Teacher'
import { usersService } from '../src/services/usersService'
import { PageProps } from './_app'

export default function TeacherPage({ setTitle }: PageProps) {
  setTitle('Professor')
  return (
    <>
      <Teacher />
    </>
  )
}

export async function getServerSideProps() {
  const userInfo = await usersService.getUserInfo()
  const hasPermition = userInfo.occupation === 'teacher'
  if (!hasPermition) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
}
