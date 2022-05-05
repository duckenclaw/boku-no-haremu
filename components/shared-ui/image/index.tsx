/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import { Img } from 'react-image'
import { LoaderIcon } from 'components/shared-ui/loader'

import s from './image.module.scss'

type ImageProps = {
  raw?: boolean
  src: string
} & React.ComponentProps<typeof Img>

export const Image: React.FC<ImageProps> = ({
  raw = false,
  src,
  children,
  width,
  height,
  style: propsStyle,
  ...props
}) => {
  const style = { width, height, ...propsStyle }
  return raw ? (
    <img src={src ?? '/images/mimi_1.png'} style={style} {...props} />
  ) : (
    <Img
      loader={
        <div
          {...props}
          style={style}
          className={classNames(s.unloader, props.className)}
        >
          <LoaderIcon />
        </div>
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
      {...props}
    />
  )
}
