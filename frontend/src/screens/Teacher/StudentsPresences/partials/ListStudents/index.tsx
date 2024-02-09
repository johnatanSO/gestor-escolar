import { Checkbox, List, ListItem } from '@mui/material'

import style from './ListStudents.module.scss'
import { Student } from '../../interfaces/Student'

type Props = {
  students: Student[]
  loading: boolean
  handleOpenPresences(student: Student): void
  handleCheckStudent(idStudent: string, checked: boolean): void
}

export function ListStudents({ students, loading, handleCheckStudent }: Props) {
  return (
    <>
      {!loading && (
        <List className={style.list}>
          {students.map((student) => {
            return (
              <ListItem className={style.listItem} key={student._id}>
                <Checkbox
                  onChange={(event) => {
                    handleCheckStudent(student._id, event.target.checked)
                  }}
                  checked={student.present}
                />
                <span>{student?.name || '--'}</span>
              </ListItem>
            )
          })}
        </List>
      )}
    </>
  )
}
