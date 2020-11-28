<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="v in videos" @click="dublePlay(v.id, $event)" :key="v.id">
        <!-- 播放按钮 -->
        <img v-show="!v.playing" class="play-btn" src="../static/image/play.png" alt="" />
        <!-- 头像 -->
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3364379035,3672240386&fm=26&gp=0.jpg" class="author" alt="" srcset="" />
        <!-- 获得赞的数量 -->
        <div class="reward-num">
          <img src="../static/image/active.png" alt="" srcset="" />
          <p>{{ v.likenum }}</p>
        </div>
        <!-- 点赞出现的心 -->
        <div class="hearts">
          <img v-for="h in hearts" :key="h.id" :style="{ left: h.x + 'px', top: h.y + 'px' }" src="../static/image/active.png" alt="" />
        </div>
        <video :id="'v-' + v.id" x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline :src="v.videoUrl" :poster="v.poster"></video>
      </div>
    </div>
  </div>

  <!-- 底部导航栏 -->
  <footer>
    <ul>
      <li>首页</li>
      <li>朋友</li>
      <li><img src="../static/image/kkb.png" alt="" /></li>
      <li>消息</li>
      <li>我</li>
    </ul>
  </footer>
</template>

<script>
import { onMounted, onBeforeMount, ref, reactive } from "vue";
import { Swiper } from "swiper";
import "../static/swiper-bundle.min.css";
import "../static/index.css";
import VIDEOS from "../static/data";
import flexible from "../static/flexable";
// import axios from 'axios'
export default {
   
  setup() {
    let videos = reactive(VIDEOS)
 
    
    onBeforeMount(() => {
      // let rel = axios.get("/videos");
    // videos =rel.data.videos;
      new flexible(window, document);

      // return videos
    });
    let hearts = reactive([]);
    let timer = null;
    let lastIndex = ref(0);
    let currentIndex = ref(0);
    let db_start = 0;
    let playing = ref(false);
    let myswiper = reactive({});
    onMounted(() => {
      // let _self = this;
      // 初始化swiper
      myswiper = new Swiper(".swiper-container", {
        direction: "vertical", // 垂直切换选项
        on: {
          slideChangeTransitionEnd: function () {
            console.log(myswiper);
            lastIndex.value = myswiper.currentIndex || 0;
            console.log(lastIndex);
            myswiper.currentIndex = myswiper.activeIndex;
            console.log(myswiper.currentIndex, myswiper.activeIndex, lastIndex);
            switchON(); // 判断上一个暂停 当前播放
          },
        },
      });
    });
    const dublePlay = (id, e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        clearTimeout(timer);
        playClick(id);
        db_start = 0;
      }, 300);
      if (db_start === 0) {
        db_start = new Date().getTime();
      } else {
        let now = new Date().getTime();
        let del = now - db_start;
        if (del <= 300) {
          // 双击
          clearTimeout(timer);
          // 小心心
          likes(e, id);
        }
        db_start = 0;
      }
    };
    const playClick = (id) => {
      videos.forEach((v) => {
        if (v.id === id) {
          // document.querySelector('#v-' + id).play()
          // 单击暂停
          if (v.playing) {
            v.playing = false;
            // playing.value=true
            console.log("暂停");
            document.querySelector("#v-" + id).pause();
          } else {
            v.playing = true;
            console.log("播放");
            // playing.value=false
            document.querySelector("#v-" + id).play();
          }
        }
      });
    };
    const switchON = () => {
      // 修改播放状态
      document.querySelector("#v-" + lastIndex.value).pause();

      videos.forEach((v) => {
        if (v.id === lastIndex.value) {
          v.playing = false;
        } else if (v.id === currentIndex.value) {
          // v.playing = true;
          if (v.playing) {
            document.querySelector("#v-" + myswiper.currentIndex).play();
          }
        }
      });
    };
    // 双击小心心
    const likes = (e, id) => {
      const screenW = document.querySelector(".swiper-container").offsetLeft;
      let x = e.clientX - screenW - 40;
      let y = e.clientY - 40;
      hearts.push({
        x,
        y,
        id: new Date().getTime(),
      });
      if (hearts.length > 5) {
        hearts.shift();
      }
      videos.forEach((v) => {
        if (v.id === id) {
          v.likenum++;
        }
      });
    };
    return {
      dublePlay,
      playClick,
      switchON,
      likes,
      timer,
      lastIndex,
      currentIndex,
      db_start,
      hearts,
      videos,
      playing,
      myswiper,
    };
  },
};
</script>

<style></style>
