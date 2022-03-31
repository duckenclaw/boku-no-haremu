import cn from 'classnames'
import s from './loader.module.scss'

type LoaderProps = {
  isLoading?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  children,
  className,
  isLoading,
}) =>
  isLoading ? (
    <div className={cn(className, s['lds-heart'])}>
      <div />
    </div>
  ) : (
    <>{children}</>
  )
