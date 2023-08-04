import Image from 'next/image'
import style from './ButtomComponent.module.scss'

type Props = {
  image: any
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
    <li
      style={disabled ? { opacity: '0.4', cursor: 'not-allowed' } : {}}
      className={style.button}
      onClick={disabled ? undefined : onClickCallback}
    >
      <div className={style.imageContainer}>
        <Image src={image} alt={alt} className={style.image} />
      </div>
      <h4>{title || '--'}</h4>
    </li>
  )
}
