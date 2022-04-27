import cn from 'classnames'
import s from './blur_container_styles.module.scss'

type BlurContainerProps = {
  className?: string
}

const BlurContainer: React.FC<BlurContainerProps> = ({
  className,
  children,
}) => {
  return <div className={cn(className, s.container)}>{children}</div>
}

export { BlurContainer }
