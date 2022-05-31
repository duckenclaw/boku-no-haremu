export const ipfsToUrlSafe = (ipfs_id?: string) =>
  ipfs_id ? `https://ipfs.io/ipfs/${ipfs_id}` : ''

export const ipfsToS3Url = (ipfs_id?: string) =>
  ipfs_id ? `${process.env.NEXT_PUBLIC_S3_BUCKET}/${ipfs_id}.png` : ''

function getPositionAtCenter(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect()
  return {
    x: left + width / 2,
    y: top + height / 2,
  }
}

export const getDistanceBetweenElements = (a: HTMLElement, b: HTMLElement) => {
  const aPosition = getPositionAtCenter(a)
  const bPosition = getPositionAtCenter(b)

  return { x: bPosition.x - aPosition.x, y: bPosition.y - aPosition.y }
}
