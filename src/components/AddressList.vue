<template>
  <div class="addresslist">
    <van-nav-bar title="收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="image" v-if="loding.length == 0">
      <img src="../img/noaddress.png" alt />
    </div>
    <template>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </template>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      orilist: [],
      loding: [{ id: 1 }],
      id: 0,
      listid: 0
    };
  },

  methods: {
    //判断是否为空
    isloding() {
      let _this = this;
      setTimeout(function() {
        _this.loding = _this.list;
      }, 200);
    },
    //新增地址
    onAdd() {
      this.$router.push({
        path: "/addaddress",
        query: {
          id: this.id,
          listid: this.listid
        }
      });
    },
    //修改地址
    onEdit(item, index) {
      console.log(item);
      this.$router.push({
        path: "/editaddress",
        query: {
          address: item.address,
          id: item.id,
          name: item.name,
          tel: item.tel
        }
      });
    },
    //返回个人中心
    onClickLeft() {
      console.log(this.id);
      if (this.id == 0) {
        this.$router.push("/person");
      } else {
        this.$router.push({
          path: "/buy",
          query: {
            id: this.id,
            listid: this.listid
          }
        });
      }
    }
  },
  //获取地址列表
  async created() {
    this.id = this.$route.query.id ? this.$route.query.id : 0;
    this.listid = this.$route.query.listid ? this.$route.query.listid : 0;
    this.isloding();
    let { data: res } = await this.$http.get("/user/addresses");
    if (res.meta.status == 200) {
      res.data.map(item => {
        let obj = {};
        obj.id = item.id;
        obj.name = item.contact_name;
        obj.address = item.address;
        obj.tel = item.contact_phone;
        this.list.push(obj);
      });
    } else {
      Toast("获取列表失败");
    }
  }
};
</script>
<style lang="less">
.addresslist {
  .van-nav-bar .van-icon {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar__text {
    color: rgb(248, 142, 160);
  }
  .van-nav-bar__title {
    color: rgb(248, 142, 160);
  }
  .van-button--danger {
    background-color: rgb(248, 142, 160);
    border-color: rgb(248, 142, 160);
  }
  .image {
    img {
      margin: auto;
      width: 200px;
      margin-top: 20%;
    }
  }
}
</style>