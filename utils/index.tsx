export const ipfsToUrlSafe = (ipfs_id?: string) =>
  ipfs_id ? `https://ipfs.io/ipfs/${ipfs_id}` : ''

export const ipfsToS3Url = (ipfs_id?: string) =>
  ipfs_id ? `${process.env.NEXT_PUBLIC_S3_BUCKET}/${ipfs_id}.png` : ''
