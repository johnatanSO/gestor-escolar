import { usersService } from '../src/services/usersService'

// Mostrar Homescreens aqui no index ao invés de redirecionar o usuário para outra rota.
export default function HomePage() {
  return <></>
}

export async function getServerSideProps(context: any) {
  const hasSession = await usersService.getSession(context)
  if (!hasSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    ...(await usersService.checkPermission(context)),
  }
}
