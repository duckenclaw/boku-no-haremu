import placeholder from 'public/images/mimi_1.png'

export const ipfsToUrlSafe = (ipfs_id?: string) =>
  ipfs_id ? `https://ipfs.io/ipfs/${ipfs_id}` : placeholder
