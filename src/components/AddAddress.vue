<template>
  <div class="addaddress">
    <van-nav-bar title="添加收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import addressData from "../data/addressData";
export default {
  data() {
    return {
      areaList: addressData,
      address: "",
      contact_name: "",
      contact_phone: 0,
      id: 0,
      listid: 0
    };
  },
  created() {
    this.id = this.$route.query.id ? this.$route.query.id : 0;
    this.listid = this.$route.query.listid ? this.$route.query.listid : 0;
  },
  methods: {
    //保存地址
    async onSave(val) {
      this.contact_name = val.name;
      this.contact_phone = val.tel;
      this.address = val.province + val.city + val.county + val.addressDetail;
      let { data: res } = await this.$http.post("address/store", {
        address: this.address,
        contact_name: this.contact_name,
        contact_phone: this.contact_phone
      });
      console.log(res);
      if (res.meta.status == 200) {
        if (this.id != 0) {
          this.$router.push({
            path: "/addresslist",
            query: {
              id: this.id,
              listid: this.listid
            }
          });
        } else {
          this.$router.push("/addresslist");
        }
        Toast("地址保存成功");
      } else {
        Toast("地址保存失败");
      }
    },
    //返回地址列表
    onClickLeft() {
      this.$router.push("/addresslist");
    }
  }
};
</script>
<style lang="less">
.addaddress {
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
}
.van-picker__cancel,
.van-picker__confirm {
  color: rgb(248, 142, 160) !important;
}
</style>