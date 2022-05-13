/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import { Img } from 'react-image'
import { LoaderIcon } from 'components/shared-ui/loader'
import cn from 'classnames'

import s from './image.module.scss'
import { useEffect, useMemo, useState } from 'react'

type ImageProps = {
  raw?: boolean
  src: string
  mode?: 'card' | 'scale-animate' | 'none'
} & React.ComponentProps<typeof Img>

export const Image: React.FC<ImageProps> = ({
  raw = false,
  src,
  children,
  width,
  height,
  mode = 'card',
  style: propsStyle,
  ...props
}) => {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const style = { width, height, ...propsStyle }
  const animationClasses = useMemo(() => {
    return {
      [s.animate]: mode === 'scale-animate',
      [s.loaded]: mode === 'scale-animate' && isLoaded,
    }
  }, [isLoaded, mode])

  const renderImage = () =>
    raw ? (
      <img
        src={src ?? '/images/mimi_1.png'}
        style={style}
        onLoad={() => setIsLoaded(true)}
        {...props}
        className={cn(animationClasses, props.className)}
      />
    ) : (
      <Img
        loader={
          mode === 'card' ? (
            <div
              {...props}
              style={style}
              className={classNames(s.unloader, props.className)}
            >
              <LoaderIcon />
            </div>
          ) : (
            <div
              {...props}
              style={style}
              className={classNames(props.className)}
            />
          )
        }
        src={src ?? '/images/mimi_1.png'}
        unloader={
          <div
            {...props}
            style={style}
            className={classNames(s.unloader, props.className)}
          >
            ?
          </div>
        }
        style={style}
        onLoad={() => setIsLoaded(true)}
        {...props}
        className={cn(animationClasses, props.className)}
      />
    )

  if (mode === 'scale-animate' && !isClient) { // if server side render
    return null
  }
  if (mode === 'scale-animate') {
    return renderImage()
  }

  return renderImage()
}
