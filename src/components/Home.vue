<template>
  <div class="home">
    <div class="title">
      <div>猪小哼零食铺</div>
      <van-search v-model="value" placeholder="请输入搜索关键词" background="pink" />
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../img/banner/banner1.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../img/banner/banner2.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../img/banner/banner3.jpg" alt />
      </van-swipe-item>
    </van-swipe>

    <div class="classification">
      <div class="class-item" @click="toclassification(0)">
        <img src="../img/class/8-1.jpg" alt />
        <span>果干类</span>
      </div>
      <div class="class-item" @click="toclassification(1)">
        <img src="../img/class/9-3.jpg" alt />
        <span>肉脯类</span>
      </div>
      <div class="class-item" @click="toclassification(2)">
        <img src="../img/class/10-1.jpg" alt />
        <span>零食类</span>
      </div>
      <div class="class-item" @click="toclassification(3)">
        <img src="../img/class/11-2.jpg" alt />
        <span>糕点类</span>
      </div>
      <div class="class-item" @click="toclassification(4)">
        <img src="../img/class/7-1.jpg" alt />
        <span>坚果类</span>
      </div>
    </div>

    <div class="banner">
      <img src="../img/banner/banner.jpg" alt />
    </div>

    <div class="foru">
      <div class="foru-title">为你推荐</div>
      <div class="goods">
        <div class="good" v-for="item in goodslist" :key="item.id" @click="togood(item.id)">
          <img :src="item.cover_url" alt />
          <div class="good-title">{{item.title}}</div>
          <div class="price">
            <span>￥</span>
            <h1>{{item.price}}</h1>
            <h2>{{item.sold_count}}人付款</h2>
            <h3>...</h3>
          </div>
        </div>
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
      value: "",
      goodslist: [],
      active: 0
    };
  },
  created() {
    this.getgoodslist();
    this.getgoodslist2();
    this.getgoodslist3();
    this.getgoodslist4();
    this.getgoodslist5();
  },
  methods: {
    //跳转商品页
    togood(id) {
      this.$router.push({
        path: "/goodsdetail",
        query: { id }
      });
    },
    //跳转到分类页
    toclassification(index) {
      this.$router.push({
        path: "/classification",
        query: { index }
      });
    },
    //获取商品列表
    async getgoodslist() {
      let { data: res } = await this.$http.post("products/home_list", {
        pid: 17
      });
      this.goodslist = res.data;
    },
    async getgoodslist2() {
      let { data: res } = await this.$http.post("products/home_list", {
        pid: 22
      });
      this.goodslist = this.goodslist.concat(res.data);
    },
    async getgoodslist3() {
      let { data: res } = await this.$http.post("products/home_list", {
        pid: 27
      });
      this.goodslist = this.goodslist.concat(res.data);
    },
    async getgoodslist4() {
      let { data: res } = await this.$http.post("products/home_list", {
        pid: 32
      });
      this.goodslist = this.goodslist.concat(res.data);
    },
    async getgoodslist5() {
      let { data: res } = await this.$http.post("products/home_list", {
        pid: 12
      });
      this.goodslist = this.goodslist.concat(res.data);
      console.log(this.goodslist);
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100px;
  .title {
    background-color: pink;
    padding: 10px;
    box-sizing: border-box;
    color: white;
    font-size: 18px;
    position: fixed;
    width: 100%;
    z-index: 10;
  }
  .my-swipe .van-swipe-item {
    margin-top: 100px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
      height: 196px;
    }
  }
  .classification {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: space-around;

    .class-item {
      margin-top: 15px;
      width: 60px;
      height: 80px;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 10px;
      text-align: center;

      img {
        width: 50px;
        height: 50px;
        border-radius: 20px;
      }
    }
    span {
      display: inline-block;
      font-size: 14px;
      color: #666;
    }
  }
  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .foru {
    width: 100%;
    background-color: rgb(243, 242, 242);
    line-height: 40px;
    margin-bottom: 50px;
    font-size: 18px;
    .foru-title {
      text-align: center;
    }
    .goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      .good {
        background-color: white;
        width: 49%;
        height: 275px;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 183px;
        }
        .good-title {
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 5px;
          box-sizing: border-box;
        }
        .price {
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          box-sizing: border-box;
          span {
            color: rgb(240, 70, 70);
            font-size: 16px;
            line-height: 43px;
          }
          h1 {
            color: rgb(240, 70, 70);
            font-size: 22px;
          }
          h2 {
            color: #999;
            font-size: 14px;
            margin-left: 5px;
            line-height: 44px;
          }
          h3 {
            color: #999;
            margin-left: auto;
            line-height: 27px;
          }
        }
      }
    }
  }
}
</style>