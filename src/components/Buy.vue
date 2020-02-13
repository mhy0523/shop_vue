<template>
  <div class="buy">
    <van-nav-bar title left-text="确认订单" left-arrow @click-left="onClickLeft" />
    <div class="detail">
      <div class="address" v-if="noaddress === true">
        <div class="icon">
          <van-icon name="location" color="#F88EA0" size="50" />
        </div>
        <div class="address-text">
          <div class="no-address" @click="selectaddress">请选择地址</div>
        </div>
      </div>
      <div class="address" v-else>
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
          :num="amount"
          :price="item.skus[0].price"
          :title="item.title"
          :thumb="item.image[0]"
        >
          <div slot="footer">
            <van-stepper v-model="amount" @plus="plus(amount)" @minus="minus(amount)" />
          </div>
        </van-card>
      </div>
    </div>
    <van-submit-bar :price="money" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      address: {},
      id: 0,
      detail: [],
      amount: 1,
      money: 0,
      oneprice: 0,
      noaddress: true,
      listid: 0
    };
  },
  created() {
    this.getaddress();
    this.id = this.$route.query.id;
    this.listid = this.$route.query.listid;
    this.getgoodsdetail();
  },
  methods: {
    //跳转添加地址页面
    selectaddress() {
      this.$router.push({
        path: "/addresslist",
        query: {
          id: this.id,
          listid: this.listid
        }
      });
    },
    //返回上一级页面
    onClickLeft() {
      this.$router.push({
        path: "/goodsdetail",
        query: {
          id: this.id,
          listid: this.listid
        }
      });
    },
    //获取收件信息
    async getaddress() {
      let { data: res } = await this.$http.get("/user/addresses");
      this.address = res.data[0];
      console.log(this.address);
      if (this.address != undefined) {
        this.noaddress = false;
        console.log(this.noaddress);
      }
    },
    //获取单件商品信息
    async getgoodsdetail() {
      if (this.id != 0) {
        let { data: res } = await this.$http.post("products/home_detail", {
          id: this.id
        });
        this.detail.push(res);
        this.money = res.skus[0].price * 100;
        this.oneprice = res.skus[0].price * 100;
        console.log(this.detail);
      }
    },
    //获取购物车列表信息
    async getcartlist() {
      let { data: res } = await this.$http.get("carts");
      this.detail = res;
    },
    //增加商品数量
    async plus(id, amount) {
      // let { data:res } = await this.$http.post('cart/save',{product_sku_id:id,amount:amount+1})
      this.money += this.oneprice;
    },
    //减少商品数量
    async minus(id, amount) {
      // let { data:res } = await this.$http.post('cart/save',{product_sku_id:id,amount:amount-1})
      this.money -= this.oneprice;
    },
    onSubmit() {
      Toast("您已支付成功！");
      this.$router.push("/home");
    }
  }
};
</script>
<style lang="less">
.buy {
  width: 100%;
  height: 100vh;
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
      .no-address {
        font-size: 20px;
        color: rgb(248, 142, 160);
        position: absolute;
        top: 30px;
        left: 50px;
      }
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
      height: 200px;
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