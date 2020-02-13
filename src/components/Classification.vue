<template>
  <div class="classification">
    <div class="left">
      <van-sidebar v-model="activeKey" @change="onchange">
        <van-sidebar-item v-for="item in firstclass" :title="item.title" :key="item.id" />
      </van-sidebar>
    </div>
    <div class="right">
      <div class="goods" v-for="item in secondclass" :key="item.id" @click="toGoodList(item.id)">
        <img :src="item.img" alt />
        <p>{{item.title}}</p>
      </div>
    </div>

    <van-tabbar v-model="active" active-color="#F88EA0">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classification">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shoppingcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/person">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      activeKey: 0,
      firstclass: [],
      secondclass: [],
      secondClassifypid: [8, 9, 10, 11, 7],
      childrenBanner: [
        [
          require("../img/class/8-1.jpg"),
          require("../img/class/8-2.jpg"),
          require("../img/class/8-3.jpg"),
          require("../img/class/8-4.jpg"),
          require("../img/class/8-5.jpg")
        ],
        [
          require("../img/class/9-1.jpg"),
          require("../img/class/9-2.jpg"),
          require("../img/class/9-3.jpg"),
          require("../img/class/9-4.jpg"),
          require("../img/class/9-5.jpg")
        ],
        [
          require("../img/class/10-1.jpg"),
          require("../img/class/10-2.jpg"),
          require("../img/class/10-3.jpg"),
          require("../img/class/10-4.jpg"),
          require("../img/class/10-5.jpg")
        ],
        [
          require("../img/class/11-1.jpg"),
          require("../img/class/11-2.jpg"),
          require("../img/class/11-3.jpg"),
          require("../img/class/11-4.jpg"),
          require("../img/class/11-5.jpg")
        ],
        [
          require("../img/class/7-1.jpg"),
          require("../img/class/7-2.jpg"),
          require("../img/class/7-3.jpg"),
          require("../img/class/7-4.jpg"),
          require("../img/class/7-5.jpg")
        ]
      ]
    };
  },
  created() {
    //获取一级分类名称
    this.activeKey = this.$route.query.index ? this.$route.query.index : 0;
    this.getfirst();
    this.getsecond();
  },
  methods: {
    //获取一级分类
    async getfirst() {
      let { data: res } = await this.$http.get("cate/home_list");
      this.firstclass = res.data;
    },
    //获取二级分类
    async getsecond() {
      let { data: res } = await this.$http.post("cate/sub_list", {
        pid: this.secondClassifypid[this.activeKey]
      });
      console.log(this.secondClassifypid[this.activeKey]);
      console.log(res.data);
      res.data.map((item, index) => {
        let img = this.childrenBanner[this.activeKey][index];
        item.img = img;
      });
      this.secondclass = res.data;
    },
    //切换一级分类
    async onchange(index) {
      this.activeKey = index;
      this.getsecond();
    },
    //二级类商品列表跳转
    async toGoodList(id) {
      this.$router.push({
        path: "/goodlist",
        query: { id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.classification {
  width: 100vw;
  height: 100%;
  display: flex;
  .left {
    width: 85px;
  }
  .right {
    width: 290px;
    height: 100%;
    .goods {
      width: 33%;
      height: 120px;
      float: left;
      p {
        text-align: center;
      }
      img {
        width: 90%;
        height: 90px;
      }
    }
  }
  .van-sidebar-item--select {
    border-color: rgb(248, 142, 160);
  }
  .van-sidebar-item {
    padding: 30px 12px 30px 8px;
  }
}
</style>