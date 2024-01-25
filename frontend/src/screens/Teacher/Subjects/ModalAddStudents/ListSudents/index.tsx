import {
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  Skeleton,
} from '@mui/material'
import style from './ListMobile.module.scss'
import { useState } from 'react'
import { EmptyItems } from '../../../../../components/EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { CollapseItem } from './interfaces/CollapseItem'
import { Field } from './interfaces/Field'
import { Student } from '..'

interface ItemStatus {
  [itemId: string]: boolean
}

type Props = {
  students: any[]
  handleSelectItem: (student: Student) => void
  loading?: boolean
}

export function ListStudent({
  students,
  handleSelectItem,
  loading,
}: Props) {
  const [itemOpened, setItemOpened] = useState<ItemStatus>({})

  function handleOpenItem(itemId: string) {
    setItemOpened({
      [itemId]: !itemOpened[itemId],
    })
  }

  return (
    <List className={style.list}>
      {!loading &&
        students?.length > 0 &&
        students?.map((item: any) => {

          return (
            <div
              style={{ opacity: loading ? 0.5 : 1 }}
              key={item._id}
              className={style.groupItem}
            >
              <ListItem
                onClick={() => {
                  handleOpenItem(item._id)
                }}
                className={style.listItem}
              >
                <FormControlLabel onChange={() => {
                  handleSelectItem(item)
                }} label={<span>{item.name}</span>} control={<Checkbox checked={item.checked} onChange={(event) => {
                  
                }} />} />
                
              </ListItem>
            </div>
          )
        })}

      {(students.length === 0 || !students) && !loading && (
        <EmptyItems text={'Nenhum aluno encontrado'} />
      )}

      {(!students || students.length === 0) &&
        loading &&
        [1, 2, 3, 4, 5].map((item) => {
          return (
            <div key={item} className={style.groupItem}>
              <ListItemButton className={style.listItem}>
                <Skeleton
                  variant="text"
                  height={18}
                  width={50}
                  sx={{ fontSize: '1rem', marginRight: 'auto' }}
                />
                <Skeleton
                  variant="text"
                  height={18}
                  width={150}
                  sx={{ fontSize: '1rem' }}
                />
              </ListItemButton>
            </div>
          )
        })}
    </List>
  )
}
