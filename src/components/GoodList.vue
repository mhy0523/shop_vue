<template>
  <div class="goodlist">
    <div class="navbar">
      <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>

    <div class="goods">
      <div class="item" v-for="item in goodlist" :key="item.id" @click="togoodsdetails(item.id)">
        <img :src="item.cover_url" />
        <p>{{item.title}}</p>
        <div class="price">
          <h1>{{item.price}}</h1>
          <h2>已售：{{item.sold_count}}</h2>
          <van-icon name="cart-o" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      goodlist: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getsecondlist();
  },
  methods: {
    //返回分类页
    onClickLeft() {
      this.$router.push("/classification");
    },
    //获取二级商品列表
    async getsecondlist() {
      let { data: res } = await this.$http.post("products/home_list", {
        pid: this.id
      });
      console.log(res);
      this.goodlist = res.data;
    },
    //跳转到商品详情页
    async togoodsdetails(id) {
      this.$router.push({
        path: "/goodsdetail",
        query: {
          id,
          listid: this.id
        }
      });
    }
  }
};
</script>
<style lang="less">
.goodlist {
  width: 100vw;
  .van-nav-bar {
    z-index: 10 !important;
  }
  .van-nav-bar .van-icon {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar__text {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar__title {
    color: rgb(248, 142, 160);
  }
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
  .goods {
    width: 100vw;
    margin-top: 46px;
    .item {
      width: 50%;
      height: 300px;
      background-color: #ffffff;
      padding: 5px;
      box-sizing: border-box;
      float: left;
      img {
        width: 100%;
        height: 177px;
      }
      p {
        line-height: 50px;
        font-size: 16px;
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        margin-left: 10px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        h1 {
          font-size: 18px;
          line-height: 50px;
          color: rgb(240, 70, 70);
        }
        h2 {
          font-size: 14px;
          line-height: 50px;
          color: #999;
          margin-left: 15px;
        }
        .van-icon {
          display: inline-block;
          margin-top: 8px;
          font-size: 30px;
          color: rgb(7, 148, 7);
        }
      }
    }
  }
}
</style>