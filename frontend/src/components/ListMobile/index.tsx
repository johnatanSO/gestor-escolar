import { Collapse, List, ListItem, ListItemButton } from '@mui/material'
import style from './ListMobile.module.scss'
import { useState } from 'react'
import { EmptyItems } from '../EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { CollapseItem } from './interfaces/CollapseItem'
import { Field } from './interfaces/Field'

interface ItemStatus {
  [itemId: string]: boolean
}

type Props = {
  items: any[]
  itemFields: Field[]
  collapseItems: CollapseItem[]
  emptyText?: string
}

export function ListMobile({
  items,
  itemFields,
  collapseItems,
  emptyText,
}: Props) {
  const [itemOpened, setItemOpened] = useState<ItemStatus>({})

  function handleOpenItem(itemId: string) {
    setItemOpened({
      [itemId]: !itemOpened[itemId],
    })
  }

  return (
    <List className={style.list}>
      {items?.map((item: any) => {
        const collapseOpened = itemOpened[item._id] || false

        return (
          <div key={item._id} className={style.groupItem}>
            <ListItem
              onClick={() => {
                handleOpenItem(item._id)
              }}
              className={style.listItem}
            >
              {itemFields?.map((field, index) => {
                return (
                  <span
                    className={field?.cellClass?.({
                      value: item[field.field],
                      data: item,
                    })}
                    key={field.field}
                    style={{
                      marginRight: index === 0 ? 'auto' : 0,
                    }}
                  >
                    {field?.valueFormatter?.({
                      value: item[field.field],
                      data: item,
                    })}

                    {field?.cellRenderer?.({
                      value: item[field.field],
                      data: item,
                    })}
                  </span>
                )
              })}
              <FontAwesomeIcon className={style.angleIcon} icon={faAngleDown} />
            </ListItem>

            <Collapse in={collapseOpened} className={style.collapse}>
              <List className={style.collapseList}>
                {collapseItems.map((collapseItem) => {
                  return (
                    <ListItemButton
                      key={collapseItem.field}
                      className={style.collapseListItem}
                    >
                      {collapseItem.type === 'actions' ? (
                        <>
                          {collapseItem?.cellRenderer?.({
                            value: item[collapseItem.field],
                            data: item,
                          })}
                        </>
                      ) : (
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {collapseItem.headerName}
                          </span>
                          <span
                            className={collapseItem?.cellClass?.({
                              value: item[collapseItem.field],
                              data: item,
                            })}
                          >
                            {collapseItem?.valueFormatter?.({
                              value: item[collapseItem.field],
                              data: item,
                            })}

                            {collapseItem?.cellRenderer?.({
                              value: item[collapseItem.field],
                              data: item,
                            })}
                          </span>
                        </>
                      )}
                    </ListItemButton>
                  )
                })}
              </List>
            </Collapse>
          </div>
        )
      })}

      {(items.length === 0 || !items) && (
        <EmptyItems text={emptyText || 'Nenhum item encontrado'} />
      )}
    </List>
  )
}
