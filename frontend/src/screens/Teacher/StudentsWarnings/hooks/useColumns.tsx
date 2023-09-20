import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../../src/components/ActionButtons'
import { Student } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

interface UseColumnsParams {
  handleOpenWarnings: (student: Student) => void
}

export function useColumns({ handleOpenWarnings }: UseColumnsParams) {
  const actions = [
    {
      icon: faWarning,
      title: 'Advertências',
      color: '#ed4252',
      onClickFunction: handleOpenWarnings,
    },
  ]

  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nome do aluno',
      field: 'user',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.name || '--',
    },
    {
      headerName: 'Quantidade de advertências',
      field: 'warningsAmount',
      valueFormatter: (params: CellFunctionParams) => params?.value || 0,
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams) => {
        return <ActionButtons actions={actions} params={params} />
      },
    },
  ]
}
