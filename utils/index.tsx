export const ipfsToUrlSafe = (ipfs_id?: string) =>
  ipfs_id ? `https://ipfs.io/ipfs/${ipfs_id}` : ''
