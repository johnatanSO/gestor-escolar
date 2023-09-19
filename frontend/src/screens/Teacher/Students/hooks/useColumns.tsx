import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../components/ActionButtons'
import { Student } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'
import { StudentDataToEdit } from '../ModalCreateNewStudent'

interface UseColumnsParams {
  handleDeleteStudent: (student: Student) => void
  handleEditStudent: (student: StudentDataToEdit) => void
}

export function useColumns({
  handleDeleteStudent,
  handleEditStudent,
}: UseColumnsParams) {
  const actions = [
    {
      icon: faPen,
      title: 'Editar',
      color: '#31a2ff',
      onClickFunction: handleEditStudent,
    },
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
      field: 'user',
      valueFormatter: (params: CellFunctionParams) => params.value.name || '--',
    },
    {
      headerName: 'E-mail',
      field: 'user',
      valueFormatter: (params: CellFunctionParams) =>
        params.value.email || '--',
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
