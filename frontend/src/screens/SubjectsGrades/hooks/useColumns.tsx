import { Column, CellFunctionParams } from '../../../../src/models/columns'
import { ActionButtons } from '../../../../src/components/ActionButtons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Subject } from '..'

interface Params {
  handleShowStudents: (subject: Subject) => void
}

export function useColumns({ handleShowStudents }: Params): Column[] {
  const actions = [
    {
      title: 'Ver alunos',
      icon: faGraduationCap,
      color: '#cd1414',
      onClickFunction: handleShowStudents,
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
      headerName: 'Quantidade de faltas',
      field: 'absences',
      valueFormatter: (params: CellFunctionParams) =>
        params?.value?.length || 0,
    },
    {
      headerName: 'Quantidade de advertências',
      field: 'warnings',
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