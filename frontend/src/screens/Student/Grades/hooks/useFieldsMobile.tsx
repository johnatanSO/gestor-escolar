export function useFieldsMobile() {
  return [
    {
      field: 'subject',
      valueFormatter: (params: any) => params?.value?.name || '--',
    },
    {
      field: 'total',
      valueFormatter: (params: any) => {
        const total = params?.data?.firstGrade + params?.data?.secondGrade
        return ((total || 0) / 2).toFixed(2)
      },
    },
  ]
}
