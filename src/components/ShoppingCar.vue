<template>
  <div class="car">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="back" />
    <div class="isempty" v-if="cartlist.length == 0">
      <img src="../img/nocarlist.png" alt />
      <span @click="tohome">快去购物吧</span>
    </div>
    <div v-else class="goodslist">
      <van-card
        v-for="item in cartlist"
        :key="item.id"
        @click="todetail(item.product_sku.product_id)"
        :num="item.amount"
        :price="item.product_sku.price"
        :title="item.product_sku.product.title"
        :thumb="item.product_sku.product.cover_url"
        :desc="item.product_sku.description"
      >
        <div slot="footer" id="footer" @click="stop">
          <van-stepper
            v-model="item.amount"
            @plus="plus(item.product_sku_id,item.amount)"
            @minus="minus(item.product_sku_id,item.amount)"
          />
          <van-button size="mini" @click="deletegoods(item.id)">删除</van-button>
        </div>
      </van-card>
    </div>
    <van-tabbar v-model="active" active-color="#F88EA0">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classification">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shoppingcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/person">个人中心</van-tabbar-item>
    </van-tabbar>
    <div class="bottom">
      <van-submit-bar :price="allmoney" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>
<script>
import { timeout } from "q";
export default {
  data() {
    return {
      cartlist: [],
      token: "",
      active: 2,
      loding: [{ id: 1 }],
      allmoney: 0
    };
  },
  created() {
    this.token = window.sessionStorage.getItem("token");
    this.islogin();
    this.getcartlist();
    // this.isloding()
  },
  methods: {
    //阻止冒泡
    stop(e) {
      e.stopPropagation();
    },
    //计算总价
    getallmoney() {
      for (let i = 0; i < this.cartlist.length; i++) {
        this.allmoney +=
          this.cartlist[i].amount * this.cartlist[i].product_sku.price * 100;
      }
    },
    //提交订单
    onSubmit() {
      this.$router.push({
        path: "/cartbuy"
      });
    },
    //判断是否为空
    // isloding () {
    //   let _this = this
    //   setTimeout(function () {
    //     _this.loding = _this.cartlist
    //   },200)
    // },
    //去home页
    tohome() {
      this.$router.push("/home");
    },
    //判断是否登录
    islogin() {
      if (this.token == null) {
        this.$router.push("/login");
      }
    },
    //返回上一层
    back() {
      this.$router.go(-1);
    },
    //获取购物车列表
    async getcartlist() {
      let { data: res } = await this.$http.get("carts");
      this.cartlist = res;
      console.log(res);
      this.getallmoney();
    },
    //删除商品
    async deletegoods(id) {
      let { data: res } = await this.$http.post("cart/del", { id });
      if (res.status == 200) {
        for (let i = 0; i < this.cartlist.length; i++) {
          if (this.cartlist[i].id == id) {
            this.cartlist.splice(i, 1);
          }
        }
      }
    },
    //增加商品数量
    async plus(id, amount) {
      let { data: res } = await this.$http.post("cart/save", {
        product_sku_id: id,
        amount: amount + 1
      });
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
    //跳转到商品详情页
    async todetail(id) {
      this.$router.push({
        path: "goodsdetail",
        query: { id }
      });
    }
  }
};
// let footer = document.getElementById('footer')
// footer.onclick = function (e) {
//   e.stopPropagation()
// }
</script>
<style lang="less">
.car {
  .goodslist {
    margin-bottom: 100px;
  }
  .isempty {
    padding-top: 50px;
    text-align: center;
    img {
      margin: auto;
      width: 250px;
    }
    span {
      color: rgb(248, 142, 160);
      display: inline-block;
      margin-top: 20px;
      font-size: 16px;
      padding: 5px 10px;
      border-radius: 20px;
      border: 1px rgb(248, 142, 160) solid;
    }
  }
  .van-nav-bar {
    position: fixed;
    width: 100%;
  }
  .van-stepper {
    float: left;
    margin-left: 50%;
  }
  .van-card__footer .van-button {
    margin-top: 5px;
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
  .van-card {
    padding-top: 50px;
  }
  .bottom {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    .van-submit-bar {
      position: relative;
    }
  }
  .van-card:not(:first-child) {
    margin-top: 0;
  }
}
</style>