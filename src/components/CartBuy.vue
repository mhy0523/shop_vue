<template>
  <div class="carbuy">
    <van-nav-bar title left-text="确认订单" left-arrow @click-left="onClickLeft" />
    <div class="detail">
      <div class="address">
        <div class="icon">
          <van-icon name="location" color="#F88EA0" size="50" />
        </div>
        <div class="address-text">
          <div class="address-name">
            <h1>{{address.contact_name}}</h1>
            <span>{{address.contact_phone}}</span>
          </div>
          <div class="address-address">{{address.address}}</div>
          <div class="waring">收货不便时，可选择免费暂存服务</div>
        </div>
        <div class="arrow">></div>
      </div>
      <div class="goods-detail">
        <div class="title">
          <img src="../assets/logo.png" alt />
          <div class="shopname">猪小哼零食铺</div>
        </div>
        <van-card
          v-for="item in detail"
          :key="item.id"
          :num="item.amount"
          :price="item.product_sku.price"
          :title="item.product_sku.product.title"
          :thumb="item.product_sku.product.cover_url"
        >
          <div slot="footer">
            <van-stepper
              v-model="item.amount"
              @plus="plus(item.id,item.amount)"
              @minus="minus(item.id,item.amount)"
            />
          </div>
        </van-card>
      </div>
    </div>
    <van-submit-bar :price="allmoney" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      address: {},
      detail: [],
      amount: 1,
      allmoney: 0,
      oneprice: 0
    };
  },
  created() {
    this.getaddress();
    this.getcartlist();
  },
  methods: {
    //获取总金额
    getallmoney() {
      for (let i = 0; i < this.detail.length; i++) {
        this.allmoney +=
          this.detail[i].amount * this.detail[i].product_sku.price * 100;
      }
    },
    //返回上一级页面
    onClickLeft() {
      this.$router.go(-1);
    },
    //获取收件信息
    async getaddress() {
      let { data: res } = await this.$http.get("/user/addresses");
      this.address = res.data[0];
    },
    //获取购物车列表信息
    async getcartlist() {
      let { data: res } = await this.$http.get("carts");
      this.detail = res;
      this.getallmoney();
    },
    //增加商品数量
    async plus(id, amount) {
      let { data: res } = await this.$http.post("cart/save", {
        product_sku_id: id,
        amount: amount + 1
      });
      // console.log(id,amount)
      this.allmoney = 0;
      this.getallmoney();
    },
    //减少商品数量
    async minus(id, amount) {
      let { data: res } = await this.$http.post("cart/save", {
        product_sku_id: id,
        amount: amount - 1
      });
      this.allmoney = 0;
      this.getallmoney();
    },
    onSubmit() {
      Toast("您已支付成功！");
      this.$router.push("/home");
    }
  }
};
</script>
<style lang="less">
.carbuy {
  width: 100%;
  background-color: rgb(247, 245, 245);
  .van-card:not(:first-child) {
    margin-top: 35px;
  }
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .van-nav-bar {
    background-color: rgb(247, 245, 245);
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
  .detail {
    width: 100%;
    padding: 50px 10px;
    box-sizing: border-box;
    .address {
      width: 100%;
      height: 120px;
      background-color: white;
      border-radius: 20px;
      position: relative;
      .icon {
        width: 50px;
        display: inline-block;
        position: absolute;
        top: 35px;
        left: 20px;
      }
      .address-text {
        position: absolute;
        top: 20px;
        left: 80px;
        width: 240px;
        .address-name {
          display: flex;
          h1 {
            font-size: 18px;
          }
          span {
            margin-left: 10px;
            color: #999;
            line-height: 28px;
          }
        }
        .address-address {
          margin-top: 5px;
          width: 225px;
          font-size: 14px;
        }
        .waring {
          margin-top: 5px;
          font-size: 14px;
          color: rgb(248, 142, 160);
        }
      }
      .arrow {
        position: absolute;
        top: 50px;
        right: 15px;
        color: #999;
      }
    }

    .goods-detail {
      width: 100%;
      background-color: white;
      margin-top: 15px;
      border-radius: 20px;
      padding: 15px;
      box-sizing: border-box;
      .title {
        position: relative;
        .shopname {
          margin-top: -5px;
          position: absolute;
          top: 8px;
          left: 50px;
        }
        img {
          width: 25px;
          height: 25px;
          position: absolute;
          left: 10px;
          top: 0px;
        }
      }
    }
  }
}
</style>