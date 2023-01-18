import { NFT } from "../models/cartdModel";

const cards: NFT[] = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  image: {
    url: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000",
    alt: "alt",
    title: "title",
  },
  authorImage: {
    url: "https://cdn.pixabay.com/photo/2022/01/17/17/20/bored-6945309__340.png",
    alt: "alt",
    title: "title",
  },
  nftName: `NFT ${i} - is a cool nft for purchase now`,
}));

const itemsPerPage = 12;

const isPageValid = (page: unknown): page is number => {
  if (typeof page === "string") {
    const parsedPage = parseInt(page);
    return !isNaN(parsedPage) && parsedPage > 0;
  }

  return typeof page === "number" && page > 0;
};

export default defineEventHandler((event) => {
  const { page } = getQuery(event);
  console.log(isPageValid(page));

  if (!isPageValid(page))
    return {
      pagination: {
        page: 1,
        itemsPerPage,
        totalItems: cards.length,
        totalPages: Math.ceil(cards.length / itemsPerPage),
      },
      cards: cards.slice(0, itemsPerPage),
    };

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const cardsOnPage = cards.slice(start, end);

  console.log(page);

  return {
    pagination: {
      page,
      itemsPerPage,
      totalItems: cards.length,
      totalPages: Math.ceil(cards.length / itemsPerPage),
    },
    cards: cardsOnPage,
  };
});
