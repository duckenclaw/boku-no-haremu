import cn from 'classnames'
import { Button } from 'game/components/button'
import s from './loader.module.scss'

type LoaderProps = {
  isLoading?: boolean
  className?: string
  isError: boolean
  onRetry?: () => void
  children?: React.ReactNode
  customRetryComponent?: React.ReactNode
}

export const Loader = ({
  children,
  className,
  isLoading,
  isError,
  customRetryComponent,
  onRetry,
}: LoaderProps) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoaderIcon />
    }
    if (isError) {
      if (customRetryComponent) {
        return customRetryComponent
      }

      if (onRetry === undefined) {
        return (
          <Button className={s.retry} onClick={onRetry} size="xsmall">
            Retry
          </Button>
        )
      }

      return <div>There was an error</div>
    }
    return <>{children}</>
  }

  return <>{renderContent()}</>
}

type LoaderIconProps = {
  className?: string
}

export const LoaderIcon: React.FC<LoaderIconProps> = ({ className }) => {
  return (
    <div className={cn(className, s['lds-heart'])}>
      <div />
    </div>
  )
}
