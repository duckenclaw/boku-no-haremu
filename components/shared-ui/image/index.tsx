import { Img, ImgProps } from 'react-image'
import { Loader } from '../loader'

type ImageProps = {} & ImgProps

export const Image: React.FC<ImageProps> = ({
  src,
  children,
  width,
  height,
  style: propsStyle,
  ...props
}) => {
  const style = { width, height, ...propsStyle }
  return (
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
