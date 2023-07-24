import { Student } from '../src/screens/Student'
import { PageProps } from './_app'

export default function StudentPage({ setTitle }: PageProps) {
  setTitle('Estudante')
  return (
    <>
      <Student />
    </>
  )
}
