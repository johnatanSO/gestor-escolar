import Image from 'next/image'
import style from './ButtomComponent.module.scss'

type Props = {
  image: any
  title: string
  alt: string
  onClickCallback: () => void
}

export function ButtonComponent({ image, title, alt, onClickCallback }: Props) {
  return (
    <li className={style.button} onClick={onClickCallback}>
      <div className={style.imageContainer}>
        <Image src={image} alt={alt} className={style.image} />
      </div>
      <h4>{title || '--'}</h4>
    </li>
  )
}
