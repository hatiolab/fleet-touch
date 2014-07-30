Ext.define('FleetTouch.view.report.DrivingReport', {
	
	extend : 'Ext.Carousel',
	
	xtype : 'rpt_driving_trend',
	
	requires : [
		'Ext.Carousel',
		'Ext.chart.Chart',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.chart.series.Bar',
		'Ext.chart.series.Line',
		'Ext.data.JsonStore'
	],
		
	config : {
		direction : 'vertical',
		cls : 'grayBg'
	},
	
	constructor : function(config) {
		
		config.items = [ this.buildChart(), this.buildTable() ];
		
		this.callParent(arguments);
		
		var url = window.location.pathname.indexOf('/m/') === 0 ? 
				  '/report/service' : 'data/driving_report.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'GET',
			params : { id : 'driving', duration : 12 },
			success : function(response) {
				var result = Ext.JSON.decode(response.responseText);

				if(result.success) {
					var records = result.items;
					var store = this.down('chart').getStore();
					store.setData(records);
					this.down('[itemId=report]').setData(records);
				} else {
					Ext.MessageBox.alert(T('label.failure'), result.msg);
				}
			},
			failure : function(response) {
				Ext.MessageBox.alert(T('label.failure'), response.responseText);
			},
			scope : this
		});
	},

	buildChart : function() {
		return {
			xtype : 'chart',
			
			theme : 'Demo',
			
			animate : true,
			
			shadow : false,
			
			toolbar : null,
			
			flex : 1,
			
			legend : {
				position : 'bottom',
				labelFont : '20px Arial'
			},

			store : Ext.create('Ext.data.Store', {
				fields : ['year', 'month', 'run_dist', 'run_time', 'yearmonth'],
				data : []
			}),

			axes : [ {
				type : 'category',
				position : 'bottom',
				fields : 'yearmonth',
				title : T('label.month')
			}, {
				type : 'numeric',
				position : 'left',
				fields : 'run_dist',
				title : T('label.run_dist') + '(km)',
				minimum : 0,
				grid : {
					odd : {
						fill : '#e8e8e8'
					}
				},
				label : {
					rotate : {
						degrees : -30
					}
				}
			}, {
				type : 'numeric',
				position : 'right',
				fields : 'run_time',
				title : T('label.run_time') + T('label.parentheses_min'),
				minimum : 0,
				label : {
					rotate : {
						degrees : -30
					}
				}
			} ],
			
			series : [ {
				type : 'line',
				xField : 'yearmonth',
				yField : ['run_time'],
				fill : true,
				smooth : true,
				highlightCfg : {
					strokeStyle : 'red',
					size : 7,
					radius : 7
				},
				style : {
					stroke : 'green',
					//shadowColor : 'green',
					shadowOffsetX : 3,
					shadowOffsetY : 3,
					minGapWidth : 1,
					maxBarWidth : 30
				}
			}, {
				type : 'bar',
				xField : 'yearmonth',
				yField : ['run_dist'],
				smooth : true,
				fille : true,
				label : {
					field : 'run_dist',
					display : 'insideEnd'
				},
				highlightCfg : {
					strokeStyle : 'red',
					size : 7,
					radius : 7
				},
				style : {
					stroke : 'blue',
					//shadowColor : 'black',
					shadowOffsetX : 3,
					shadowOffsetY : 3,
					minGapWidth : 1,
					maxBarWidth : 30
				}
			} ]
		};
	},

	buildTable : function() {
		return {
			xtype : 'panel',
			cls : 'paddingAll15',
			itemId : 'report',
			data : {},
			tpl : [
				'<table class=dataGrid>',
					'<tr>',
						'<th>'+ T('label.year') +'</th>',
						'<th>'+ T('label.month') +'</th>',
						'<th>'+ T('label.run_dist') +'</th>',
						'<th>'+ T('label.run_time') +'</th>',
					'</tr>',
					'<tpl for=".">',
					'<tr>',
						'<td class="alignCenter">{year}</td>',
						'<td class="alignCenter">{month}</td>',
						'<td class="alignCenter">{run_dist}</td>',
						'<td class="alignCenter">{run_time}</td>',
					'</tr>',
					'</tpl>',
				'</table>'
			]	
        };
	}
});
