<template>
	 <div class="mui-content" id="app" v-cloak>
		<div class="search clearfix bg-f5f5f5">
			<input type="" name="" id="" value="" placeholder="搜索医院，医生，科室，疾病" />
			<img src="../../assets/img/searchImg.png" alt="" class='searchImg' />
			<span class='pull-right searchText'>搜索</span>
		</div>
		<div class="content">
			<div class="left" >
				<div v-for="(item,i) in  20" :class="i==index?'active':''" @click="doctorle(i)">
					<span>营养食品</span>
				</div>
			</div>
			<div class="right" ref='right'>
				<div v-for="item in  30">
					<span>呼吸系统科</span>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
  data() {
    return {
      index: 0
    };
  },
  mounted() {},
  methods: {
    doctorle: function(value) {
      this.index = value;
      //滚动条始终顶部
      this.$refs.right.scrollTop=0;
    }
  }
};
</script>

<style scoped>
.search {
  height: 1.2rem;
  z-index: 3;
}

.content {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 1.2rem;
  background: #ffffff;
  display: flex;
}
.content > div::-webkit-scrollbar {
  display: none;
}
/*.content > div {
  overflow: hidden;
  overflow-y: scroll;
}*/
.content > .left::-webkit-scrollbar {
  display: none;
}
.content > .left {
  width: 41.9%;
  background: #fafafa;
  overflow: hidden;
  overflow-y: scroll;
}

.content > .right {
  width: 59.1%;
  overflow: hidden;
  overflow-y: scroll;
}

.content > .left > div {
  padding-left: 0.35rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-family: PingFang-SC-Regular;
  font-size: 0.32rem;
  color: #333333;
  letter-spacing: 2px;
}
.content > .left > .active {
  color: #18bc9a;
  background: #ffffff;
}
.content > .right > div {
  width: 85%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  height: 0.8rem;
  line-height: 0.8rem;
  font-family: PingFang-SC-Regular;
  font-size: 0.32rem;
  color: #666666;
  letter-spacing: 2px;
}
.search{
    width: 100%;
    padding: 14px 15px;
    height: 1.24rem;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    display: flex;
    background:none;
}
.search input {
  width: 5.7rem;
  height: 0.68rem;
  line-height: 0.34rem;
  background-color: #ffffff !important;
  border: 0.01rem solid #f5f5f5;
  border-radius: 0.34rem;
  font-size: 0.28rem;
  padding-left: 0.88rem;
  outline: none;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  -webkit-appearance: none;
  border: 1px solid gainsboro;
}
.search img {
  width: 0.34rem;
  height: 0.36rem;
  display: block;
  position: relative;
  top: 0.16rem;
  left: -5.4rem;
  z-index: 99;
}
.search span {
  color: #18bc9a;
  font-size: 0.3rem;
  position: absolute;
  right: 0.58rem;
  top: 0.42rem;
}
</style>
