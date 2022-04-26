import cn from 'classnames'
import s from './styles.module.scss'

type Props = {
  className?: string
}

const ScreenTitle: React.FC<Props> = ({ className, children }) => {
  return <h1 className={cn(className, s.title)}>{children}</h1>
}

export { ScreenTitle }
