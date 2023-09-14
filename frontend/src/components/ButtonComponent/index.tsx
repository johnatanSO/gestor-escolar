import Image, { StaticImageData } from 'next/image'
import style from './ButtomComponent.module.scss'

type Props = {
  image: StaticImageData
  title: string
  alt: string
  onClickCallback: () => void
  disabled: boolean
}

export function ButtonComponent({
  image,
  title,
  alt,
  onClickCallback,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={style.button}
      onClick={onClickCallback}
    >
      <div className={style.imageContainer}>
        <Image src={image} alt={alt} className={style.image} />
      </div>
      <h4>{title || '--'}</h4>
    </button>
  )
}
