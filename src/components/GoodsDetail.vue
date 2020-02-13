<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in detail.image" :key="item.id">
        <img :src="item" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="detailtext">
      <p class="title">{{detail.title}}</p>
      <div class="price clearfix">
        <h1>{{detail.price}}</h1>
        <h2>总销量：{{detail.sold_count}}</h2>
      </div>
      <div class="promotion">
        <div class="text">促销</div>
        <div class="content">
          <div class="content-item">
            <span>满赠</span>
            <h3>满109元赠送蛋黄酥</h3>
          </div>
          <div class="content-item">
            <span>换购</span>
            <h3>满69元加价购小零食</h3>
          </div>
          <div class="content-item">
            <span>换购</span>
            <h3>满88元加价购小零食</h3>
          </div>
        </div>
      </div>
      <div class="evaluate">
        <h4>主人说</h4>
        <div class="level">
          好评率
          <span>100%</span>>
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/shoppingcar" />
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="addtocart" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="tobuy" />
    </van-goods-action>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      id: 0,
      detail: {},
      listid: 0,
      amount: 0
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.listid = this.$route.query.listid;
    this.getdetail();
  },
  methods: {
    //购买页
    tobuy() {
      this.$router.push({
        path: "/buy",
        query: {
          id: this.id,
          listid: this.listid
        }
      });
    },
    //加载详情
    async getdetail() {
      let { data: res } = await this.$http.post("products/home_detail", {
        id: this.id
      });
      this.detail = res;
      console.log(this.detail);
    },
    //返回到商品列表
    onClickLeft() {
      if (this.listid == undefined) {
        this.$router.go(-1);
      } else {
        this.$router.push("/goodlist?id=" + this.listid);
      }
    },
    //加入购物车
    async addtocart() {
      this.amount += 1;
      let { data: res } = await this.$http.post("cart/save", {
        product_sku_id: this.detail.skus[0].id,
        amount: this.amount
      });
      console.log(this.detail.skus[0].id);
      if (res.status == 200) {
        Toast("添加成功！");
      }
    }
  }
};
</script>
<style lang="less">
.detail {
  .van-nav-bar .van-icon {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar__text {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar__title {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .my-swipe .van-swipe-item {
    margin-top: 46px;
    color: #fff;
    font-size: 20px;
    line-height: 300px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detailtext {
    padding: 5px;
    box-sizing: border-box;
    .title {
      display: inline-block;
      line-height: 30px;
      font-size: 18px;
    }
    .price {
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom: 1px #ddd solid;
      h1 {
        color: rgb(240, 70, 70);
        font-size: 30px;
        display: inline-block;
        float: left;
      }
      h2 {
        color: #999;
        font-size: 16px;
        line-height: 30px;
        display: inline-block;
        float: right;
      }
    }
    .promotion {
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      border-bottom: 1px #ddd solid;
      .text {
        color: #999;
        font-size: 18px;
      }
      .content {
        .content-item {
          display: flex;
          margin-left: 20px;
          margin-bottom: 10px;
          span {
            display: inline-block;
            padding: 3px;
            box-sizing: border-box;
            color: rgb(240, 70, 70);
            font-size: 16px;
            line-height: 18px;
            border: 1px rgb(240, 70, 70) solid;
            border-radius: 10px;
          }
          h3 {
            margin-left: 15px;
            color: #333;
          }
        }
      }
    }
    .evaluate {
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px #ddd solid;
      margin-bottom: 50px;
      h4 {
        color: #999;
        font-size: 18px;
        display: inline-block;
      }

      .level {
        color: #999;
        font-size: 18px;
        span {
          margin: 0 10px;
          color: rgb(240, 70, 70);
        }
      }
    }
  }
}
</style>