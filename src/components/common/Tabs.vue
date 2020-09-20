<template>
  <!--        tab-->
  <ul class="tabs">
    <li v-for="(item,index) in tabs"
        :class="['tab_item',activeName===item.name?'active':'']"
        :key="index"
        v-if="item.auth.includes(role)"
        @click="handleChangeTab(item.name)">
      <i :class="['iconfont',item.icon]" v-if="item.icon"></i>
      <span> {{item.name}}</span>
      <span class="dot"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tabs",
  props:["tabs","activeName","toAudit"],
  computed:{
    role(){
      return sessionStorage.getItem("roleName");
    }
  },
  methods:{
    handleChangeTab(name){
      this.$emit("handleChangeTab",name);
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  margin: .2rem 0;
  height: 0.56rem;
  background-color: #cde8f2;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;

  .tab_item {
    padding: 0 .1rem;
    width: 1.8rem;
    height: 100%;
    float: left;
    line-height: .56rem;
    text-align: center;
    color: #666;
    font-size: .17rem;
    transition: all 500ms;
    cursor: pointer;
    position: relative;

    .dot{
      width: 8px;
      height: 8px;
      background: red;
      position: absolute;
      top:5px;
      right: 5px;
      border-radius: 50%;
    }

    i {
      font-size: .18rem;
    }

    &.active {
      background-color: #fff;
      color:#3494e9;
      font-weight: bold;
      i{
        font-weight: normal;
      }
      &:hover{
        background-color: #fff;
        color:#3494e9;
        font-weight: bold;
      }
    }
    &:hover{
      background-color: rgba(255, 255, 255, 0.3);
    }
    .iconpingjia{
      font-size: .22rem;
      vertical-align: middle;
    }
  }
}
</style>
