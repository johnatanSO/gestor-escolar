import { Box, CircularProgress } from '@mui/material'

type Props = {
  size?: number
  color?: string
}

export function Loading({ size, color }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContend: 'center' }}>
      <CircularProgress style={{ color: color || 'white' }} size={size || 10} />
    </Box>
  )
}
