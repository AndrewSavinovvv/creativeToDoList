<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {format} from "date-fns";
import {ru} from "date-fns/locale"

const details = ref(null);
const route = useRoute();

const formatDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: ru });
};
onMounted(() => {
  const savePost = localStorage.getItem('text');
  if (savePost) {
    const posts = JSON.parse(savePost);
    const postId = route.params.id;
    details.value = posts.find(post => post.id === parseInt(postId,10));
  }
});
</script>

<template>
  <div v-if="details" class="details">
    <div class="details__title">Название: {{ details.title }}</div>
    <div class="details__description">Описание: {{ details.description }} </div>
    <div class="details__date">{{ formatDate(details.date) }}</div>
  </div>
</template>

<style>
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 100px;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  box-sizing: border-box;
}
.details__title,
.details__description,
.details__date {
  background: #15101C;
  color: #9E78CF;
  margin-bottom: 10px;
  padding: 24px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
}
</style>/