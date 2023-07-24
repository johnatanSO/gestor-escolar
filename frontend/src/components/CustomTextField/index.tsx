import { styled } from '@mui/system'
import {
  inputLabelClasses,
  outlinedInputClasses,
  TextField,
} from '@mui/material'

export const CustomTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderRadius: '10px',
    borderColor: '#c4c4cc',
    color: '#c4c4cc',
  },
  [`& .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    // Style da borda do input quando tem um erro
    borderRadius: '0.7rem',
    border: '2px solid #ff4646',
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      // Style da borda com hover
      borderColor: '#aaaaaa',
    },
  [`&:hover .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    // Style da borda com hover
    borderColor: '#ff2222',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      // Style da borda do input quando estiver em foco.
      borderColor: '#cd1414',
    },
  [`& .${outlinedInputClasses.input} `]: {
    // Style do valor dentro do input quando sair do foco
    color: '#323238',
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    // Style do valor com hover.
    color: '#7c7c8a',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      // Style do placeholder quando estiver em foco
      color: '#323238',
    },
  [`& .${inputLabelClasses.outlined}`]: {
    // Style da label
    color: '#323238',
  },
  [`& .Mui-error`]: {
    // Cor do text do error
    color: '#ff4646',
  },
  [`& .Mui-error .MuiSelect-icon`]: {
    // Style do icone quadno tem um erro
    color: '#ff4646',
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    // Style da label em foco
    color: '#cd1414',
  },
})
