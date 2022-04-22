/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Img, ImgProps } from 'react-image'
import { Loader } from '../loader'

type ImageProps = { raw?: boolean; src: string } & ImgProps

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
        <div {...props}>
          <Loader isLoading={true} />
        </div>
      }
      src={src ?? '/images/mimi_1.png'}
      unloader={<Img {...props} style={style} src={'/images/mimi_1.png'} />}
      style={style}
      {...props}
    />
  )
}
