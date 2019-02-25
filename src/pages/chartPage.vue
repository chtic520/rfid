<template>
	 <div :style="{height: height, width: width}" ref="chart"></div>
</template>

<script>
	import echarts from 'echarts';
	import 'echarts/theme/macarons'; // echarts 主题
  import SEAT from '../config/seat.js';

	export default {
		props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '1400px'
      },
      flightType: [String, Number]
    },
    data() {
      return {
        seatType: this.flightType,
        chart: null,
        chartData: SEAT[this.flightType].chartInitData,
        defaultOpt: SEAT[this.flightType].seatInitData
      };
    },
		mounted(){
			this.initChart();
		},
		beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.chart, 'macarons');
       
        let option = this.getChartOpt();

        this.chart.setOption(option);
      },
  		updateChart(data){
  			let seatArr = data.seat.split('');
  			let rowNo = seatArr[0] + seatArr[1];
  			let colNo = seatArr[2];

  			let rowSection = this.getRowSection(rowNo);
  			let colSection = this.getColSection(colNo);
  			let rowChart = 0;
  			let colChart = 0;

  			this.defaultOpt.yAxis[rowSection].map(function(item, index){
  				if(item == rowNo){
  					rowChart = index;
  				}
  			});
  			this.defaultOpt.xAxis[rowSection][colSection].map(function(item, index){
  				if(item == colNo){
  					colChart = index;
  				}
  			});

  			let colCount = this.defaultOpt.yAxis[rowSection].length;
  			let coord = colChart*colCount + rowChart;

  			this.chartData[rowSection][colSection][coord][2] = data.state;

  			let option = this.getChartOpt();

        this.chart.setOption(option);
  		},
  		getChartOpt(){
  			let defaultOpt = this.defaultOpt;
        let chartData = this.chartData;

        let option = {
        	tooltip: {
        		show: false
        	},
        	grid: SEAT[this.seatType + 'Opt'].grid,
        	xAxis: SEAT[this.seatType + 'Opt'].xAxis,
			    yAxis: SEAT[this.seatType + 'Opt'].yAxis,
			    series: SEAT[this.seatType + 'Opt'].series
        }

        return option;
  		},
  		getRowSection(rowNo){
  			if(parseInt(rowNo) > 0 && parseInt(rowNo) <= 2){
  				return 'firstClass';
  			}else if(parseInt(rowNo) >= 31 && parseInt(rowNo) < 35){
  				return 'highClass';
  			}else if(parseInt(rowNo) >= 35 && parseInt(rowNo) <= 56){
  				return 'economyClass'
  			}else{
  				throw new Error('The seatNumber is not existed!');
  			}
  		},
  		getColSection(colNo){
  			if(colNo == 'A' || colNo == 'B' || colNo == 'C'){
  				return 'a';
  			}else if(colNo == 'H' || colNo == 'J' || colNo == 'K'){
  				return 'b';
  			}else{
  				throw new Error('The seatNumber is not existed!');
  			}
  		}
    }
	}
</script>

<style>
</style>