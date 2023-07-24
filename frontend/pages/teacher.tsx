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
