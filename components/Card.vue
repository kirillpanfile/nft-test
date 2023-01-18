<script setup lang="ts">
import { NFT } from "~~/server/models/cartdModel";
import { PropType } from "vue";

defineProps({
  nft: {
    type: Object as PropType<NFT>,
    required: true,
  },
});
</script>

<template>
  <div
    class="h-64 w-72 overflow-hidden relative bg-white rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl"
  >
    <div class="p-3">
      <img
        class="w-full h-48 object-cover rounded-xl"
        :src="nft.image.url"
        :alt="nft.image.alt"
        :title="nft.image.title"
      />
    </div>
    <div class="flex px-3 gap-3">
      <div class="relative w-1/2">
        <img
          class="w-16 h-16 rounded-lg absolute -bottom-6 left-1/4 transform -translate-y-6 p-1 bg-white"
          :src="nft.authorImage.url"
          :alt="nft.authorImage.alt"
          :title="nft.authorImage.title"
        />
      </div>
      <h1
        class="mt-2 font-black text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {{ nft.nftName }}
      </h1>
    </div>
  </div>
</template>
