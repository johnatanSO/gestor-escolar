import { Column, CellFunctionParams } from '../../../../../src/models/columns'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../../src/components/ActionButtons'
import { Student } from '..'

interface UseColumnsParams {
  handleOpenWarnings: (student: Student) => void
}

export function useColumns({ handleOpenWarnings }: UseColumnsParams): Column[] {
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
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
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
