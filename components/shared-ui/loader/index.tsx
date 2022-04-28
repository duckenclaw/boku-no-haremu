import cn from 'classnames'
import { Button } from 'game/components/button'
import s from './loader.module.scss'

type LoaderProps = {
  isLoading?: boolean
  className?: string
  isError: boolean
  onRetry: () => void
}

export const Loader: React.FC<LoaderProps> = ({
  children,
  className,
  isLoading,
  isError,
  onRetry,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={cn(className, s['lds-heart'])}>
          <div />
        </div>
      )
    }
    if (isError) {
      return (
        <Button className={s.retry} onClick={onRetry} size="xsmall">
          Retry
        </Button>
      )
    }
    return <>{children}</>
  }

  return renderContent()
}
