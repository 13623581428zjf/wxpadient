<template>
	  <div class="mui-content" id="app" v-cloak>
			<div class="doctorlecture">
				<ul>
					<li @click="doctorle(0)" :class="{active:index==0}">正在直播</li>
					<li @click="doctorle(1)" :class="{active:index==1}">直播预告</li>
					<li @click="doctorle(2)" :class="{active:index==2}">视频回放</li>
				</ul>
			</div>
			<!--正在直播-->
			<div class="onxldie" v-if="this.index==0">
				<div class="onxldielist">
					<div class="onxldielistL">
						<div class="onxldielistLlo"><img src="../../assets/img/di.png" /></div>
					</div>
					<div class="onxldielistc">
						<div class="onxldielistcna">
							阳明要&nbsp;|&nbsp;主任医师
						</div>
						<div class="onxldielistcname">
							北京协和医院&nbsp;&nbsp;皮肤病
						</div>
					</div>
					<div class="onxldielistr">
						<div class="onxldielistrpri">
							￥500.00
						</div>
					</div>
				</div>
				<div class="onxldielistcont">
					<p>立在零教授：腹泻病规范化液盐正口服液盐的治疗地位液盐</p>
					<p><img style="height: .3rem;" src="../../assets/img/za.png"/>&nbsp;&nbsp;直播中<span>526观看</span></p>
				</div>
				<div style="height: .18rem; width: 100%;"></div>
			</div>
			<div class="onxldie" v-if="this.index==0">
				<div class="onxldielist">
					<div class="onxldielistL">
						<div class="onxldielistLlo"><img src="../../assets/img/di.png" /></div>
					</div>
					<div class="onxldielistc">
						<div class="onxldielistcna">
							阳明要&nbsp;|&nbsp;主任医师
						</div>
						<div class="onxldielistcname">
							北京协和医院&nbsp;&nbsp;皮肤病
						</div>
					</div>
					<div class="onxldielistr">
						<!--<div class="onxldielistrpri">
							￥500.00
						</div>-->
						<div class="onxldielistrpri">
							免费
						</div>
					</div>
				</div>
				<div class="onxldielistcont">
					<p>立在零教授：腹泻病规范化液盐正口服液盐的治疗地位液盐</p>
					<p><img style="height: .3rem;ma" src="../../assets/img/za.png"/>&nbsp;&nbsp;直播中<span>526观看</span></p>
				</div>
				<div style="height: .18rem; width: 100%;"></div>
			</div>
			<!--直播预告-->
			<div class="onxldie" v-if="this.index==1">
				<div class="onxldielist">
					<div class="onxldielistL">
						<div class="onxldielistLlo"><img src="../../assets/img/di.png" /></div>
					</div>
					<div class="onxldielistc">
						<div class="onxldielistcna">
							阳明要&nbsp;|&nbsp;主任医师
						</div>
						<div class="onxldielistcname">
							北京协和医院&nbsp;&nbsp;皮肤病
						</div>
					</div>
					<div class="onxldielistr">
						<div class="onxldielistrpri">
							￥500.00
						</div>
					</div>
				</div>
				<div class="onxldielistcont">
					<p>立在零教授：腹泻病规范化液盐正口服液盐的治疗地位液盐</p>
					<p><img style="height: .26rem;" src="../../assets/img/time.png"/>&nbsp;&nbsp;预告<span style="color: #18BC9A;">2018-08-22&nbsp;10:00</span></p>
				</div>
				<div style="height: .18rem; width: 100%;"></div>
			</div>
			<!--正在直播-->
			<div class="onxldie" v-if="this.index==2">
				<div class="onxldielist">
					<div class="onxldielistL">
						<div class="onxldielistLlo"><img src="../../assets/img/di.png" /></div>
					</div>
					<div class="onxldielistc">
						<div class="onxldielistcna">
							阳明要&nbsp;|&nbsp;主任医师
						</div>
						<div class="onxldielistcname">
							北京协和医院&nbsp;&nbsp;皮肤病
						</div>
					</div>
					<div class="onxldielistr">
						<div class="onxldielistrpri">
							￥500.00
						</div>
					</div>
				</div>
				<div class="onxldielistcont">
					<p>立在零教授：腹泻病规范化液盐正口服液盐的治疗地位液盐</p>
					<p><img style="height: .26rem;" src="../../assets/img/ew.png"/>&nbsp;&nbsp;回放<span>526观看</span><span style="margin-left: 2rem;">2018-08-22&nbsp;10:00</span></p>
				</div>
				<div class="onxldielistveido">
					<div></div>
				</div>
				<div style="height: .18rem; width: 100%;"></div>
				<div class="onxldielist">
					<div class="onxldielistL">
						<div class="onxldielistLlo"><img src="../../assets/img/di.png" /></div>
					</div>
					<div class="onxldielistc">
						<div class="onxldielistcna">
							阳明要&nbsp;|&nbsp;主任医师
						</div>
						<div class="onxldielistcname">
							北京协和医院&nbsp;&nbsp;皮肤病
						</div>
					</div>
					<div class="onxldielistr">
						<div class="onxldielistrpri">
							￥500.00
						</div>
					</div>
				</div>
				<div class="onxldielistcont">
					<p>立在零教授：腹泻病规范化液盐正口服液盐的治疗地位液盐</p>
					<p><img style="height: .26rem;" src="../../assets/img/ew.png"/>&nbsp;&nbsp;回放<span>526观看</span><span style="margin-left: 2rem;">2018-08-22&nbsp;10:00</span></p>
				</div>
				<div class="onxldielistveido">
					<div></div>
				</div>
				<div style="height: .18rem; width: 100%;"></div>
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
    }
  }
};
</script>

<style scoped>
.doctorlecture ul {
  width: 100%;
  height: 0.8rem;
  background: #fff;
  font-size: 0.28rem;
  color: #5d5d5d;
  letter-spacing: 0.006rem;
  text-align: center;
  line-height: 0.8rem;
  display: flex;
  border-bottom: 0.01rem solid #f0f0f0;
}

.doctorlecture ul li {
  width: 20%;
  margin-left: 9.5%;
}

.active {
  color: #18bc9a;
  border-bottom: #18bc9a 0.03rem solid;
}

.onxldielist {
  width: 100%;
  height: 1.3rem;
  padding-top: 0.25rem;
  background: #fff;
  display: flex;
  border-bottom: 0.01rem solid #f0f0f0;
}

.onxldielistL {
  width: 18%;
  height: auto;
  text-align: center;
}

.onxldielistLlo {
}

.onxldielistLlo img {
  width: 0.7rem;
  height: 0.7rem;
  margin-top: 0.06rem;
}

.onxldielistc {
  width: 62%;
  text-align: left;
}

.onxldielistcna {
  font-size: 0.24rem;
  color: #333333;
}

.onxldielistcname {
  font-size: 0.24rem;
  color: #bebebe;
}

.onxldielistr {
  width: 20%;
  font-size: 0.3rem;
  color: #e9473a;
}

.onxldielistcont {
  width: 100%;
  height: 1.6rem;
  background: #fff;
  padding-top: 0.12rem;
  padding-left: 0.4rem;
  padding-right: 0.3rem;
}

.onxldielistcont p:nth-of-type(1) {
  font-size: 0.3rem;
  color: #333333;
  text-align: justify;
}

.onxldielistcont p:nth-of-type(2) {
  font-size: 0.24rem;
  color: #18bc9a;
  margin-top: 0.1rem;
  text-align: left;
}

.onxldielistcont span {
  margin-left: 0.28rem;
  font-size: 0.24rem;
  color: #cccccc;
}

.onxldielistrpri {
  text-align: right;
  padding-right: 0.3rem;
}
.onxldielistveido {
  width: 100%;
  height: 3.34rem;
  background: #fff;
  padding-top: 0.15rem;
}
.onxldielistveido div {
  width: 92%;
  height: 94%;
  margin: 0% 4.1%;
  background: #afd9ee;
}
</style>