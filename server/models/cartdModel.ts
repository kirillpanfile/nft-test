export type image = {
  url: string;
  alt: string;
  title: string;
};

export type NFT = {
  id: number;
  image: image;
  authorImage: image;
  nftName: string;
};
