import cn from 'classnames'
import { Button } from 'game/components/button'
import s from './loader.module.scss'

type LoaderProps = {
  isLoading?: boolean
  className?: string
  isError?: boolean
  onRetry?: () => void
  customRetryComponent?: React.ReactNode
  isNoData?: boolean
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
  isNoData,
  customNoDataComponent,
}: LoaderProps) => {
  if (isLoading) return <LoaderIcon className={className} />
  if (isError) {
    return (
      <>
        {customRetryComponent ? (
          customRetryComponent
        ) : onRetry ? (
          <Button className={s.retry} onClick={onRetry} size="xsmall">
            Retry
          </Button>
        ) : (
          <div>There was an error</div>
        )}
      </>
    )
  }

  if (isNoData) {
    return (
      <>
        {customNoDataComponent ?? (
          <>
            <div className={s.nodata}>No data</div>
            {onRetry && (
              <Button className={s.retry} onClick={onRetry} size="xsmall">
                Retry
              </Button>
            )}
          </>
        )}
      </>
    )
  }

  return <>{children}</>
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
