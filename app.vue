<script setup lang="ts">
import { NFT } from "./server/models/cartdModel";
const Card = defineAsyncComponent(async () => {
  return await import("./components/Card.vue");
});

type Tresponse = {
  pagination: {
    page: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  cards: NFT[];
};

const isResponseValid = (response: any): response is Tresponse => {
  const responsePagination = response.pagination;
  const responseCards = response.cards;

  return (
    Object.keys(responsePagination).length > 0 &&
    Array.isArray(responseCards) &&
    responseCards.length > 0
  );
};

const currentPage = ref(1);

const { data } = await useLazyFetch<Tresponse>(
  `/api/cards?page=${currentPage.value}`
);
const cards = isResponseValid(data.value) ? data.value.cards : [];

const canWeFetchMore = computed(() => {
  const pagination = data.value?.pagination;
  if (!pagination) return false;

  return pagination.page < pagination.totalPages;
});

const fetchMoreCards = async () => {
  if (!canWeFetchMore.value) return;
  currentPage.value++;

  console.log(data.value?.pagination);

  const { data: cardsResponse } = await useLazyFetch<Tresponse>(
    `/api/cards?page=${currentPage.value}`
  );
  const newCards = isResponseValid(cardsResponse.value)
    ? cardsResponse.value.cards
    : [];
  cards.push(...newCards);

  data.value = cardsResponse.value;
};
</script>

<template>
  <main class="max-w-2xl mx-auto mt-24 px-12">
    <h1 class="text-3xl font-semi">My collections</h1>
    <p class="mb-8">Lorem ipsum dolor sit, amet consectetur</p>

    <section
      class="grid md:grid-cols-2 items-center justify-around gap-7 mb-12 grid-cols-1"
    >
      <Card
        v-for="nft in cards"
        :key="nft.id"
        :nft="nft"
        class="mx-auto md:mx-0"
      />
    </section>

    <div class="w-full relative mb-12">
      <button
        class="mx-auto block px-12 py-4 border-black border"
        v-if="canWeFetchMore"
        @click="fetchMoreCards"
      >
        View More
      </button>
    </div>
  </main>
</template>
