import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../components/ActionButtons'
import { Student } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

interface UseColumnsParams {
  handleDeleteStudent: (student: Student) => void
}

export function useColumns({ handleDeleteStudent }: UseColumnsParams) {
  const actions = [
    {
      icon: faTrash,
      title: 'Excluir',
      color: '#ed4252',
      onClickFunction: handleDeleteStudent,
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
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams) => {
        return <ActionButtons actions={actions} params={params} />
      },
    },
  ]
}
