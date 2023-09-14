import { StaticImageData } from 'next/image'

export interface ButtonHomeScreen {
  image: StaticImageData
  alt: string
  title: string
  onClickCallback: () => void
  disabled?: boolean
}
