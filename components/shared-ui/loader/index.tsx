import cn from 'classnames'
import { Button } from 'game/components/button'
import s from './loader.module.scss'

type LoaderProps = {
  isLoading?: boolean
  className?: string
  isError?: boolean
  onRetry?: () => void
  customRetryComponent?: React.ReactNode
  noData?: boolean
  customNoDataComponent?: React.ReactNode
  children?: React.ReactNode
}

export const Loader = ({
  children,
  className,
  isLoading,
  isError,
  customRetryComponent,
  onRetry,
  noData,
  customNoDataComponent,
}: LoaderProps) => {
  const renderNoDataState = () => {
    if (customNoDataComponent) {
      return customNoDataComponent
    }

    if (onRetry) {
      return (
        <Button className={s.retry} onClick={onRetry} size="xsmall">
          Retry
        </Button>
      )
    }

    return <div>No data</div>
  }

  const renderErrorState = () => {
    if (customRetryComponent) {
      return customRetryComponent
    }

    if (onRetry) {
      return (
        <Button className={s.retry} onClick={onRetry} size="xsmall">
          Retry
        </Button>
      )
    }
    return <div>There was an error</div>
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoaderIcon />
    }
    if (isError) {
      return renderErrorState()
    }
    if (noData) {
      return renderNoDataState()
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
