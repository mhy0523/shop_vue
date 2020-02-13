<template>
  <div class="editAddress">
    <van-nav-bar title="编辑收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      show-delete
      :address-info="info"
      :area-list="areaList"
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
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
      info: {
        name: "",
        id: 0,
        tel: 0,
        province: "",
        city: "",
        county: "",
        address_detail: "",
        area_code: 0
      }
    };
  },
  //得到被修改信息
  async created() {
    this.info.address_detail = this.$route.query.address;
    this.info.name = this.$route.query.name;
    this.info.tel = this.$route.query.tel;
    this.info.id = this.$route.query.id;
  },
  methods: {
    //删除地址
    async onDelete() {
      let { data: res } = await this.$http.post("address/delete", {
        id: this.info.id
      });
      console.log(res);
      if (res.meta.status == 200) {
        this.$router.push("/addresslist");
        Toast(res.meta.msg);
      } else {
        Toast("地址删除失败！");
      }
    },
    //保存地址
    async onSave(val) {
      this.contact_name = val.name;
      this.id = val.id;
      this.contact_phone = val.tel;
      this.address = val.province + val.city + val.county + val.addressDetail;
      console.log(this.contact_name, this.contact_phone, this.address);
      let { data: res } = await this.$http.post("address/update", {
        id: this.id,
        address: this.address,
        contact_name: this.contact_name,
        contact_phone: this.contact_phone
      });
      if (res.meta.status == 200) {
        this.$router.push("/addresslist");
        Toast("地址修改成功");
      } else {
        Toast("地址修改失败");
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
.van-picker__cancel,
.van-picker__confirm {
  color: rgb(248, 142, 160) !important;
}
.editAddress {
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
</style>