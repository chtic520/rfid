function renderItem(param, api) {
    let item = api.coord([api.value(0), api.value(1)]);
    let value = api.value(2);
    let seatState = ['normal', 'good', 'near', 'over'];
    let size = api.size([0, 0]);
    let seatImage = {
				good: './static/images/seat-green.png',
				over: './static/images/seat-red.png',
				near: './static/images/seat-blue.png',
				normal: './static/images/seat-gray.png'
			};

    return {
        type: 'image',
        style: {
            image: seatImage[seatState[value]],
            $action: 'replace',
            width: size[0],
            height: size[1],
            x: item[0] - (size[0] / 2),
            y: item[1] - (size[1] / 2)
        }
    }
}

let narrow = {
	chartInitData: {
  	firstClass: {
  		a: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0]],
  		b: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0]]
  	},
  	highClass: {
  		a: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0]],
  		b: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0]]
  	},
  	economyClass: {
  		a: [
  			[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 0], [0, 12, 0], [0, 13, 0], [0, 14, 0], [0, 15, 0], [0, 16, 0], [0, 17, 0], [0, 18, 0], [0, 19, 0], [0, 20, 0], [0, 21, 0],
  			[1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 0], [1, 11, 0], [1, 12, 0], [1, 13, 0], [1, 14, 0], [1, 15, 0], [1, 16, 0], [1, 17, 0], [1, 18, 0], [1, 19, 0], [1, 20, 0], [1, 21, 0],
  			[2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 0], [2, 11, 0], [2, 12, 0], [2, 13, 0], [2, 14, 0], [2, 15, 0], [2, 16, 0], [2, 17, 0], [2, 18, 0], [2, 19, 0], [2, 20, 0], [2, 21, 0]
  		],
  		b: [
  			[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 0], [0, 12, 0], [0, 13, 0], [0, 14, 0], [0, 15, 0], [0, 16, 0], [0, 17, 0], [0, 18, 0], [0, 19, 0], [0, 20, 0], [0, 21, 0],
  			[1, 0, 0], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 0], [1, 11, 0], [1, 12, 0], [1, 13, 0], [1, 14, 0], [1, 15, 0], [1, 16, 0], [1, 17, 0], [1, 18, 0], [1, 19, 0], [1, 20, 0], [1, 21, 0],
  			[2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 0], [2, 11, 0], [2, 12, 0], [2, 13, 0], [2, 14, 0], [2, 15, 0], [2, 16, 0], [2, 17, 0], [2, 18, 0], [2, 19, 0], [2, 20, 0], [2, 21, 0]
  		]
  	}
  },
  seatInitData: {
  	xAxis: {
  		firstClass: {
  			a: ["A", "C"],
  			b: ["H", "K"]
  		},
  		highClass: {
  			a: ["A", "B", "C"],
  			b: ["H", "J", "K"]
  		},
  		economyClass: {
  			a: ["A", "B", "C"],
  			b: ["H", "J", "K"]
  		}
  	},
  	yAxis: {
  		firstClass: ["02", "01"],
  		highClass: ["34", "33", "32", "31"],
  		economyClass: ["56", "55", "54", "53", "52", "51", "50", "49", "48", "47", "46", "45", "44", "43", "42", "41", "40", "39", "38", "37", "36", "35"]
  	}
  }
}

let narrowOpt = {
	grid: [
		{x: '7%', y: '2%', width: '38%', height: '9%'},
    {x2: '7%', y: '2%', width: '38%', height: '9%'},
    {x: '7%', y: '14%', width: '38%', height: '14%'},
    {x2: '7%', y: '14%', width: '38%', height: '14%'},
    {x: '7%', y2: '6%', width: '38%', height: '64%'},
    {x2: '7%', y2: '6%', width: '38%', height: '64%'},
    {x: '8%', y2: '3%', width: '8%', height: '2%'},
    {x: '33%', y2: '3%', width: '8%', height: '2%'},
    {x: '58%', y2: '3%', width: '8%', height: '2%'},
    {x: '83%', y2: '3%', width: '8%', height: '2%'}
	],
	xAxis: [
    {gridIndex: 0, type: 'category', axisLine: {show: false}, axisTick: {show: false}, position: 'top', data: narrow.seatInitData.xAxis.firstClass.a},
    {gridIndex: 1, type: 'category', axisLine: {show: false}, axisTick: {show: false}, position: 'top', data: narrow.seatInitData.xAxis.firstClass.b},
    {gridIndex: 2, type: 'category', axisLine: {show: false}, axisTick: {show: false}, position: 'top', data: narrow.seatInitData.xAxis.highClass.a},
    {gridIndex: 3, type: 'category', axisLine: {show: false}, axisTick: {show: false}, position: 'top', data: narrow.seatInitData.xAxis.highClass.b},
    {gridIndex: 4, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: narrow.seatInitData.xAxis.economyClass.a},
    {gridIndex: 5, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: narrow.seatInitData.xAxis.economyClass.b},
    {gridIndex: 6, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['A'], name: '待盘点', nameLocation: 'middle', nameGap: '6'},
    {gridIndex: 7, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['A'], name: '正常', nameLocation: 'middle', nameGap: '6'},
    {gridIndex: 8, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['A'], name: '临近过期', nameLocation: 'middle', nameGap: '6'},
    {gridIndex: 9, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['A'], name: '已过期', nameLocation: 'middle', nameGap: '6'}
  ],
  yAxis: [
    {gridIndex: 0, type: 'category', axisLine: {show: false}, axisTick: {show: false}, data: narrow.seatInitData.yAxis.firstClass},
    {gridIndex: 1, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: narrow.seatInitData.yAxis.firstClass},
    {gridIndex: 2, type: 'category', axisLine: {show: false}, axisTick: {show: false}, data: narrow.seatInitData.yAxis.highClass},
    {gridIndex: 3, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: narrow.seatInitData.yAxis.highClass},
    {gridIndex: 4, type: 'category', axisLine: {show: false}, axisTick: {show: false}, data: narrow.seatInitData.yAxis.economyClass},
    {gridIndex: 5, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: narrow.seatInitData.yAxis.economyClass},
    {gridIndex: 6, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['01']},
    {gridIndex: 7, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['01']},
    {gridIndex: 8, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['01']},
    {gridIndex: 9, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, data: ['01']},
    {gridIndex: 1, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, position: 'right', name: '头等舱', nameLocation: 'middle', nameGap: '10', nameRotate: 270},
    {gridIndex: 3, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, position: 'right', name: '高端经济舱', nameLocation: 'middle', nameGap: '10', nameRotate: 270},
    {gridIndex: 5, type: 'category', axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false}, position: 'right', name: '经济舱', nameLocation: 'middle', nameGap: '10', nameRotate: 270}
  ],
  series: [
  	{ type: 'custom', data: narrow.chartInitData.firstClass.a, xAxisIndex: 0, yAxisIndex: 0, renderItem: renderItem },
  	{ type: 'custom', data: narrow.chartInitData.firstClass.b, xAxisIndex: 1, yAxisIndex: 1, renderItem: renderItem },
  	{ type: 'custom', data: narrow.chartInitData.highClass.a, xAxisIndex: 2, yAxisIndex: 2, renderItem: renderItem },
  	{ type: 'custom', data: narrow.chartInitData.highClass.b, xAxisIndex: 3, yAxisIndex: 3, renderItem: renderItem },
  	{ type: 'custom', data: narrow.chartInitData.economyClass.a, xAxisIndex: 4, yAxisIndex: 4, renderItem: renderItem },
  	{ type: 'custom', data: narrow.chartInitData.economyClass.b, xAxisIndex: 5, yAxisIndex: 5, renderItem: renderItem },
  	{ type: 'custom', data: [[0,0,0]], xAxisIndex: 6, yAxisIndex: 6, renderItem: renderItem },
  	{ type: 'custom', data: [[0,0,1]], xAxisIndex: 7, yAxisIndex: 7, renderItem: renderItem },
  	{ type: 'custom', data: [[0,0,2]], xAxisIndex: 8, yAxisIndex: 8, renderItem: renderItem },
  	{ type: 'custom', 	data: [[0,0,3]], 	xAxisIndex: 9, yAxisIndex: 9, renderItem: renderItem }
  ]
}

export default {
	narrow,
	narrowOpt,
	wide: narrow,
	wideOpt: narrowOpt
}