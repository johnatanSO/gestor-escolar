import { usersService } from '../src/services/usersService'

export default function HomePage() {
  return <></>
}

export function getServerSideProps(context: any) {
  const userInfo = usersService.getUserInfoByCookie(context)
  const isStudent = userInfo.occupation === 'student'
  const isTeacher = userInfo.occupation === 'teacher'

  if (!isStudent && !isTeacher) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  if (isTeacher) {
    return {
      redirect: {
        permanent: false,
        destination: '/teacher',
      },
    }
  }
  if (isStudent) {
    return {
      redirect: {
        permanent: false,
        destination: '/student',
      },
    }
  }
  return {
    props: {},
  }
}
