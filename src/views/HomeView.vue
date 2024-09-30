<script setup>
import { ref, watch, onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import {format} from "date-fns";
import {ru} from "date-fns/locale"

const newPost = reactive({ title: "", description: "", id: 0, date: "", done: false });
const posts = ref([]);
const router = useRouter();


const goDetails = (postId) => {
  router.push({ name: "Details", params: { id: postId } });
};

const addPost = () => {
  if (newPost.title || newPost.description) {
    const postId = Date.now();
    const date = new Date().toISOString();
    posts.value.push({ ...newPost, id: postId, date, done: false });
    newPost.title = "";
    newPost.description = "";
    newPost.id = 0;
  }
};
const donePosts = computed(() => posts.value.filter(task => task.done));

const isDone = (postIndex) => {
  posts.value[postIndex].done = true;

};
const formatDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: ru });
};


const removePost = (postIndex) => {
  posts.value.splice(postIndex, 1);
};

watch(posts, (newValue) => {
  localStorage.setItem("text", JSON.stringify(newValue));
}, { deep: true });

onMounted(() => {
  const savedPosts = localStorage.getItem('text');
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  }
});
</script>

<template>
  <div class="home">
    <div class="home__container">
      <input v-model="newPost.title" class="container__input" placeholder="Название задачи">
      <textarea v-model="newPost.description" class="container__input" placeholder="Описание задачи"></textarea>
      <button @click="addPost" class="container__btn">
        <img src="../assets/Plus.png">
      </button>
    </div>
    <div class="tasks">
      <h2>Список задач: {{ posts.length }}</h2>
      <ul class="tasks__list">
        <li v-for="(task, index) in posts" :key="task.id" class="tasks__element" @click="goDetails(task.id)">
          <div>{{ task.title }}</div>
          <div>{{ task.description }}</div>
          <div>{{ formatDate(task.date) }}</div>
          <div>
            <button @click.stop="isDone(index)" class="tasks__btn">
              <img src="../assets/done.png">
            </button>
            <button @click.stop="removePost(index)" class="tasks__btn">
              <img src="../assets/delete.png">
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="tasks">
    <h2>Сделанные задачи: {{ donePosts.length }}</h2>
      <ul class="tasks__list">
        <li v-for="(task, index) in donePosts" :key="task.id" class="tasks__element__done">
          <div>{{ task.title }}</div>
          <div>{{ task.description }}</div>
          <div>{{ formatDate(task.date) }}</div>
          <div>
            <button @click.stop="removePost(index)" class="tasks__btn">
              <img src="../assets/delete.png">
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 100px;
  width: 100%;
}

.home__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  box-sizing: border-box;
}

.container__input {
  height: 40px;
  width: 100%;
  background: none;
  border: 1px solid #3E1671;
  border-radius: 10px;
  padding-left: 10px;
  color: white;
  margin-left: 10px;
  margin-bottom: 10px;
}

.container__btn {
  height: 40px;
  width: 100%;
  background: #9E78CF;
  border-radius: 10px;
  border: none;
  margin-left: 10px;
  cursor: pointer;
}

.tasks {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
}

.tasks__list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  margin-top: 10px;
}

.tasks__element,
.tasks__element__done {
  background: #15101C;
  margin-bottom: 10px;
  padding: 24px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9E78CF;
}

.tasks__element__done {
  color: #78CFB0;
  text-decoration: line-through;
}

.tasks__btn {
  background: none;
  color: white;
  cursor: pointer;
  border: none;
}
</style>