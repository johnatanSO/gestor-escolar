export function useFieldsMobile() {
  return [
    {
      field: 'student',
      valueFormatter: (params: any) => params?.value?.name || '--',
    },
  ]
}
