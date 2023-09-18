import { faGraduationCap, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../components/ActionButtons'
import { Subject } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

interface UseColumnsParams {
  handleDeleteSubject: (subject: Subject) => void
  handleAddStudents: (subject: Subject) => void
}

export function useColumns({
  handleDeleteSubject,
  handleAddStudents,
}: UseColumnsParams) {
  const actions = [
    {
      icon: faGraduationCap,
      title: 'Alunos',
      color: '#31a2ff',
      onClickFunction: handleAddStudents,
    },
    {
      icon: faTrash,
      title: 'Excluir',
      color: '#ed4252',
      onClickFunction: handleDeleteSubject,
    },
  ]

  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nome da disciplina',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Quantidade de alunos',
      field: 'students',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.length || 0,
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
