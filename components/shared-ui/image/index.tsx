import { Img, ImgProps } from 'react-image'

type ImageProps = {} & ImgProps

export const Image: React.FC<ImageProps> = ({ src, children, ...props }) => {
  return (
    <div>
      <Img
        src={src ?? '/images/mimi_1.png'}
        unloader={<Img src={'/images/mimi_1.png'} />}
        {...props}
      />
    </div>
  )
}
