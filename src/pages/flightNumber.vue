<template>
  <f7-page>
	  <f7-navbar title="输入飞机号" back-link="Back" sliding></f7-navbar>
		<f7-list>
			<f7-list-item media="飞机号： B-">{{flightNumber}}</f7-list-item>
		</f7-list>
		<f7-block v-for="(row, index) in keyboard" :key="index">
			<f7-grid>
				<f7-col v-for="(item, key) in row" :key="key">
					<template v-if="item === 'clear'">
						<f7-button bg="orange" color="white" @click="onInput" :data-key="item">清空</f7-button>
					</template>
					<template v-else-if="item === 'back'">
						<f7-button bg="orange" color="white" @click="onInput" :data-key="item">
							<f7-icon f7="arrow_left" :data-key="item"></f7-icon>
						</f7-button>
					</template>
					<template v-else>
						<f7-button bg="orange" color="white" @click="onInput" :data-key="item">{{item}}</f7-button>
					</template>
				</f7-col>
			</f7-grid>
		</f7-block>
    <f7-block>
    	<f7-grid>
    		<f7-col>
    			<f7-button bg="orange" color="white" @click="onSubmit">确定</f7-button>
    		</f7-col>
    	</f7-grid>
    </f7-block>
  </f7-page>
</template>

<script>
import fetch from '../fetch';
import {BASE_URL} from '../api/url.js';

export default {
	data(){
		return {
			flightNumber: '',
			keyboard: [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["clear", 0, "back"]]
		}
	},
	methods: {
		onInput(e){
			let keyValue = e.target.dataset.key;
			switch(keyValue){
				case 'clear':
					this.flightNumber = '';
					break;
				case 'back':
					this.flightNumber = this.flightNumber.substring(0, this.flightNumber.length - 1);
					break;
				default:
					this.flightNumber += keyValue;
					break;
			}
		},
		onSubmit(){
			let self = this;
			if(self.flightNumber == ''){
				self.$f7.alert('请输入飞机号!', '提示');
				return false;
			}

			/*fetch(BASE_URL.FLIGHT_INFO, {flightNumber: self.flightNumber})
				.then(function(res){
					if(res.success){
						let query = fomatterQuery(res.data);
						self.$router.load({url: '/quick/' + this.flightNumber + '/?' + query});
					}else{
						self.$f7.alert(res.msg, '提示');
					}
				})
				.catch(function(err){
					self.$f7.alert(err, '提示');
				})*/
			let n = Math.ceil(Math.random()*2);
			self.$router.load({url: '/quick/' + this.flightNumber + '/?flightType=' + (n == 1 ? 'narrow' : 'wide')});
		},
		fomatterQuery(data){
			let query = '';
			Object.keys(data).map(function(key, index, arr){
				if (index != (arr.length - 1)){
					query += key + '=' + data[key] + "&";
				}else{
					query += key + '=' + data[key];
				}
			});

			return query;
		}
	}
}
</script>