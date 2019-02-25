<template>
  <f7-page>
    <f7-navbar sliding>
    	<f7-nav-left back-link="Back"></f7-nav-left>
  		<f7-nav-center>救生衣快速盘点：B-{{$route.params.flightNumber}}</f7-nav-center>
    </f7-navbar>
    <f7-swiper pagination :params="{ effect: 'flip' }">
		  <f7-swiper-slide class="slide-bg">
		  	<h3 class="result-title">救生衣盘点结果</h3>
		  	<f7-list>
		  		<f7-list-item media="<span class='item-name'>盘点数量：</span>">{{info.didCheck}}/{{info.totalCheck}}</f7-list-item>
		  		<f7-list-item class="state-normal" media="<span class='item-name'>正常：</span>">{{info.normal}}</f7-list-item>
		  		<f7-list-item class="state-near" media="<span class='item-name'>临近过期：</span>">{{info.nearDate}}</f7-list-item>
		  		<f7-list-item class="state-over" media="<span class='item-name'>已过期：</span>">{{info.overDate}}</f7-list-item>
		  		<f7-list-item class="state-uncheck" media="<span class='item-name'>未盘点：</span>">{{info.totalCheck - info.didCheck}}</f7-list-item>
		  	</f7-list>
		  	<f7-block>
		    	<f7-grid>
		    		<f7-col>
		    			<f7-button bg="orange" color="white" @click="showDetailPage">详情</f7-button>
		    		</f7-col>
		    	</f7-grid>
	    	</f7-block>
	    	<f7-block>
		    	<f7-grid>
		    		<f7-col>
		    			<ul class="chunkNumber">
		    				<li v-for="(item, key) in chunkNumberList" :key="key">{{item}}</li>
		    			</ul>
		    		</f7-col>
		    	</f7-grid>
		    </f7-block>
		  </f7-swiper-slide>
		  <f7-swiper-slide class="slide-bg">
		  	<div class="content-slide">
		  		<div class="info-table">
		  			<table class="info">
	    				<tr>
	    					<td width="30%" align="right">盘点：</td>
	    					<td width="20%">{{info.didCheck}}/{{info.totalCheck}}</td>
	    					<td width="30%" align="right" class="state-normal">正常：</td>
	    					<td width="20%" class="state-normal">{{info.normal}}</td>
	    				</tr>
	    				<tr>
	    					<td align="right" class="state-near">临近过期：</td>
	    					<td class="state-near">{{info.nearDate}}</td>
	    					<td align="right" class="state-over">已过期：</td>
	    					<td class="state-over">{{info.overDate}}</td>
	    				</tr>
	    			</table>
		  		</div>
		  		<div class="chart-window">
			  		<chart-page ref="chartPage" :flightType="$route.query.flightType"></chart-page>
			  	</div>
		  	</div>
		  </f7-swiper-slide>
		</f7-swiper>
    	<f7-toolbar bottom>
			  <f7-button bg="orange" @click="check" :disabled="!showStop">
			  	<f7-icon :f7="showPause ? 'pause_fill' : 'play_fill'"></f7-icon>
			  </f7-button>
			  <f7-button :bg="showStop ? 'orange' : 'green'" @click="stop">
			  	<template v-if="showStop">
			  		<span class="block"></span>
			  	</template>
			  	<template v-else>
			  		提交
			  	</template>
			  </f7-button>
		</f7-toolbar>
		<f7-popup :opened="showDetail">
			<f7-navbar sliding>
	  		<f7-nav-center>详情列表</f7-nav-center>
	    	<f7-nav-right>
          <f7-link @click="showDetail=false">
            <f7-icon f7="close"></f7-icon>
          </f7-link>
        </f7-nav-right>
	    </f7-navbar>
	    <f7-block>
	    	<f7-grid no-gutter>
	    		<f7-col width="20"><f7-button bg="orange" color="white" tab-link="#tab1" active>全部</f7-button></f7-col>
	    		<f7-col width="20"><f7-button bg="orange" color="white" tab-link="#tab2">正常</f7-button></f7-col>
	    		<f7-col width="20"><f7-button bg="orange" color="white" tab-link="#tab3">临近过期</f7-button></f7-col>
	    		<f7-col width="20"><f7-button bg="orange" color="white" tab-link="#tab4">已过期</f7-button></f7-col>
	    		<f7-col width="20"><f7-button bg="orange" color="white" tab-link="#tab5">未盘点</f7-button></f7-col>
	    	</f7-grid>
	    	<f7-grid>
	    		<f7-col>
	    			<f7-tabs animated>
							<f7-tab id="tab1" active>
								<v-table style="width:100%" :height="479" is-horizontal-resize :columns="tableConfig" :table-data="totalList" :on-row-click="showItemDetailPage"></v-table>
							</f7-tab>
							<f7-tab id="tab2">
								<v-table style="width:100%" :height="479" is-horizontal-resize :columns="tableConfig" :table-data="normalList" :on-row-click="showItemDetailPage"></v-table>
							</f7-tab>
							<f7-tab id="tab3">
								<v-table style="width:100%" :height="479" is-horizontal-resize :columns="tableConfig" :table-data="nearList" :on-row-click="showItemDetailPage"></v-table>
							</f7-tab>
							<f7-tab id="tab4">
								<v-table style="width:100%" :height="479" is-horizontal-resize :columns="tableConfig" :table-data="overList" :on-row-click="showItemDetailPage"></v-table>
							</f7-tab>
							<f7-tab id="tab5">
								<v-table style="width:100%" :height="479" is-horizontal-resize :columns="tableConfig" :table-data="uncheckList" :on-row-click="showItemDetailPage"></v-table>
							</f7-tab>
						</f7-tabs>
	    		</f7-col>
	    	</f7-grid>
	    </f7-block>
		</f7-popup>
		<f7-popup :opened="showItemDetail">
			<f7-navbar sliding>
	  		<f7-nav-center>救生衣详情</f7-nav-center>
	    	<f7-nav-right>
          <f7-link @click="showItemDetail=false">
            <f7-icon f7="close"></f7-icon>
          </f7-link>
        </f7-nav-right>
	    </f7-navbar>
		  <f7-list>
	  		<f7-list-item media="<span class='item-name'>序列号：</span>">{{seatItemInfo.index}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>状态：</span>">{{seatItemInfo.state | formatterState}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>EPC：</span>">{{seatItemInfo.epc}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>座位号：</span>">{{seatItemInfo.seatNumber}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>MFR：</span>">{{seatItemInfo.mfr}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>PNO：</span>">{{seatItemInfo.pno}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>SER：</span>">{{seatItemInfo.ser}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>EXP：</span>">{{seatItemInfo.exp}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>PDT：</span>">{{seatItemInfo.pdt}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>MDF：</span>">{{seatItemInfo.mdf}}</f7-list-item>
	  		<f7-list-item media="<spann class='item-name'>CNT：</span>">{{seatItemInfo.cnt}}</f7-list-item>
	  	</f7-list>
		</f7-popup>
  </f7-page>
</template>

<script>
import ChartPage from './chartPage.vue';
import fetch from '../fetch';
import {BASE_URL} from '../api/url.js';

export default {
	data(){
		let _this = this;

		// 写死的数据，线上删除
		let seat = ['01A', '01C', '01H', '01K', '02A', '02C', '02H', '02K', '31A', '31B', '31C', '31H', '31J', '31K', '32A', '32B', '32C', '32H', '32J', '32K', '33A', '33B', '33C', '33H', '33J', '33K', '34A', '34B', '34C', '34H', '34J', '34K', '35A', '35B', '35C', '35H', '35J', '35K', '36A', '36B', '36C', '36H', '36J', '36K', '37A', '37B', '37C', '37H', '37J', '37K', '38A', '38B', '38C', '38H', '38J', '38K', '39A', '39B', '39C', '39H', '39J', '39K', '40A', '40B', '40C', '40H', '40J', '40K', '41A', '41B', '41C', '41H', '41J', '41K', '42A', '42B', '42C', '42H', '42J', '42K', '43A', '43B', '43C', '43H', '43J', '43K', '44A', '44B', '44C', '44H', '44J', '44K', '45A', '45B', '45C', '45H', '45J', '45K', '46A', '46B', '46C', '46H', '46J', '46K', '47A', '47B', '47C', '47H', '47J', '47K', '48A', '48B', '48C', '48H', '48J', '48K', '49A', '49B', '49C', '49H', '49J', '49K', '50A', '50B', '50C', '50H', '50J', '50K', '51A', '51B', '51C', '51H', '51J', '51K', '52A', '52B', '52C', '52H', '52J', '52K', '53A', '53B', '53C', '53H', '53J', '53K', '54A', '54B', '54C', '54H', '54J', '54K', '55A', '55B', '55C', '55H', '55J', '55K', '56A', '56B', '56C', '56H', '56J', '56K'];
		return {
			info: {
				nearDate: 0,
				overDate: 0,
				normal: 0,
				totalCheck: _this.$route.query.seatTotal,
				didCheck: 0
			},
			chunkNumberList: [],
			seatItemInfo: {},
			loopTime: 500,
			showDetail: false,
			showItemDetail: false,
			showStop: true,
			showPause: false,
			timer: null,
			seat: seat, // 写死的数据，线上删除
			totalList: [],
			nearList: [],
			overList: [],
			uncheckList: [],
			normalList: [],
			tableConfig: [
				{field: 'index', title:'序列号', width: 20, titleAlign: 'center',columnAlign:'center', isResize:true},
				{field: 'epc', title:'EPC', width: 20, titleAlign: 'center',columnAlign:'center', isResize:true},
				{field: 'seatNumber', title:'座位号', width: 20, titleAlign: 'center',columnAlign:'center', isResize:true},
				{field: 'state', title:'状态', width: 20, titleAlign: 'center',columnAlign:'center', isResize:true, formatter: function(rowData){
					let stateString = '未盘点'
					switch(rowData.state){
						case 1:
							stateString = '<span class="state-normal">正常</span>';
							break;
						case 2:
							stateString = '<span class="state-near">临近过期</span>';
							break;
						case 3:
							stateString = '<span class="state-over">已过期</span>';
							break;
						default:
							stateString = '<span class="state-uncheck">未盘点</span>';
							break;
					}

					return stateString;
				}}
			]
		}
	},
	filters: {
    formatterState(value){
      let stateString = '未盘点'
				switch(value){
					case 1:
						stateString = '正常';
						break;
					case 2:
						stateString = '临近过期';
						break;
					case 3:
						stateString = '已过期';
						break;
					default:
						stateString = '未盘点';
						break;
				}

				return stateString;
    }
  },
	components: { ChartPage },
	mounted(){
		this.initialList();
		console.log(this.$refs.chartPage.chart.getOption())
	},
	methods: {
		check(){
			if(this.showPause){
				return this.pauseCheck();
			}else{
				return this.startCheck();
			}
		},
		stop(){
			if(this.showStop){
				return this.stopCheck();
			}else{
				return this.commitCheck();
			}
		},
		startCheck(){
			let _this = this;

			_this.showPause = true;

			if(_this.timer){
				clearInterval(_this.timer);
			}

			_this.timer = setInterval(function(){

				/* 对接打开 */

				/*fetch(BASE_URL.QUICK_CHECK)
					.then(function(res){
						if(res.success){
							let state = res.state;
							let seat = res.seat

							_this.$refs.chartPage.updateChart({seat: seat, state: state});
							switch(state){
								case 1:
									_this.info.normal++;
									break;
								case 2:
									_this.info.nearDate++;
									break;
								case 3:
									_this.info.overDate++;
									break;
							}
							_this.totalList[_this.info.didCheck] = {index: (_this.info.didCheck + 1), epc: '', seatNumber: seat, state: state};

							_this.info.didCheck++

							if(res.done) {clearInterval(_this.timer)};
						}
					})
					.catch(function(err){
						clearInterval(_this.timer);
						_this.$f7.alert(err, '提示');
					})*/

				/* 本地调试代码，对接删除 START */
				let state = Math.ceil(Math.random()*3)

				_this.$refs.chartPage.updateChart({seat: _this.seat[_this.info.didCheck], state: state});
				switch(state){
					case 1:
						_this.info.normal++;
						break;
					case 2:
						_this.info.nearDate++;
						break;
					case 3:
						_this.info.overDate++;
						break;
				}
				_this.totalList[_this.info.didCheck] = {index: (_this.info.didCheck + 1), epc: '', seatNumber: _this.seat[_this.info.didCheck], state: state};

				_this.info.didCheck++

				if(_this.info.didCheck > (_this.seat.length - 1)) {clearInterval(_this.timer)};
				/* 本地调试代码，对接删除 END */
				
			}, _this.loopTime)
		},
		pauseCheck(){
			if(this.timer){
				clearInterval(this.timer);
			}

			this.showPause = false;
		},
		stopCheck(){
			if(this.timer){
				clearInterval(this.timer);
			}
			this.showStop = false;
		},
		commitCheck(){
			let self = this;


			self.$f7.confirm('确认要提交吗？', '提示', function(){
				/* 对接打开 */
				/*fetch(BASE_URL.COMMIT, {total: this.totalList})
					.then(function(res){
						if(res.success){
							self.$f7.alert(res.msg, '提示', function(){
								self.$router.back();
							})
						}else{
							self.$f7.alert(res.msg, '提示')
						}
					})
					.catch(function(err){
						self.$f7.alert(err, '错误')
					})*/

				/* 本地调试代码，对接删除 */
				self.$f7.alert('提交成功', '提示', function(){
					window.location.reload();
				})
			})


		},
		initialList(){
			let _this = this;
			_this.seat.map(function(item, index){
				_this.totalList.push({index: (index + 1), epc: '', seatNumber: item, state: 0});
			})
		},
		showDetailPage(){
			let _this = this;

			// 重置
			_this.normalList = [];
			_this.nearList = [];
			_this.overList = [];
			_this.uncheckList = [];

			_this.totalList.map(function(item){
				switch(item.state){
					case 1:
						_this.normalList.push(item);
						break;
					case 2:
						_this.nearList.push(item);
						break;
					case 3:
						_this.overList.push(item);
						break;
					default:
						_this.uncheckList.push(item);
						break;
				}
			})

			_this.showDetail = true;
		},
		showItemDetailPage(rowIndex, rowData){
			this.seatItemInfo = rowData;
			this.showItemDetail = true;
		}
	}
}
</script>

<style>
	.toolbar-inner {
    -webkit-justify-content: space-around;
    justify-content: space-around;
	}
	.toolbar i.icon{
		display: inline-block;
	}
	.content-slide{
		height: 100%;
		padding: 8% 4%;
		box-sizing: border-box;
	}
	.info-table{
		height: 12%;
	}
	.chart-window{
		height: 88%;
		overflow: auto;
	}
	.info{
		width: 100%;
	}
	.slide-bg{
	  overflow: auto;
	  background-color: #fff;
	}
	.swiper-container{
		height: 100%;
	}
	.item-name{
		display: inline-block;
		width: 5rem;
		text-align: right;
	}
	.block{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #fff;
		vertical-align: middle;
		border-radius: 2px;
	}
	.result-title{
		margin: 0;
		text-align: center;
		margin-top: 2rem;
	}
	.chunkNumber{
		width: 80%;
		display: block;
		margin: auto;
		border: 1px solid #000;
		height: 4rem;
		overflow-y: auto;
		list-style: none;
		padding: 0px 10px;
		border-radius: 4px;
	}
	.state-normal{
		color: #4cd964;
	}
	.state-near{
		color: #007aff;
	}
	.state-over{
		color: #ff3b30;
	}
	.state-uncheck{
		color: #8e8e93;
	}
</style>