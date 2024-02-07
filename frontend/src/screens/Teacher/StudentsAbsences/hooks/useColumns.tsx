import { Student } from '..'
import { CellFunctionParams } from '../../../../components/TableComponent/interfaces'

interface UseColumnsParams {
  handleOpenWarnings: (student: Student) => void
}

export function useColumns({ handleOpenWarnings }: UseColumnsParams) {
  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<any>) => params.value || '--',
    },
    {
      headerName: 'Nome do aluno',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<any>) => params.value || '--',
    },
    {
      headerName: 'Quantidade de advertências',
      field: 'warningsAmount',
      valueFormatter: (params: CellFunctionParams<any>) => params?.value || 0,
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams<any>) => {
        return (
          <>
            <span>any</span>
          </>
        )
      },
    },
  ]
}
