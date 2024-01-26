import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import style from '../Warnings.module.scss'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

export function useColumns() {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<any>) => params.value,
    },
    {
      headerName: 'Título',
      field: 'title',
      valueFormatter: (params: CellFunctionParams<any>) => params.value || '--',
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams<any>) => params?.value,
    },
    {
      headerName: 'Data',
      field: 'date',
      valueFormatter: (params: CellFunctionParams<any>) =>
        dayjs(params?.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Ações',
      field: 'actions',
      cellRenderer: (params: CellFunctionParams<any>) => (
        <button className={style.warningDetails} type="button">
          <FontAwesomeIcon icon={faInfoCircle} className={style.icon} />
          Detalhes
        </button>
      ),
    },
  ]
}
