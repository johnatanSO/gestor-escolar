import { Subjects } from '../src/screens/Subjects'
import { usersService } from '../src/services/usersService'
import { PageProps } from './_app'

export default function NewSubjectPage({ setTitle }: PageProps) {
  setTitle('Professor')
  return (
    <>
      <Subjects />
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
