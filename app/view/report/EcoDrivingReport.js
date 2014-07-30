Ext.define('FleetTouch.view.report.EcoDrivingReport', {
	
	extend : 'Ext.Carousel',
	
	xtype : 'rpt_eco_driving_trend',
	
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
		
		var url = window.location.pathname.indexOf('/m/') === 0 ? '/report/service' : 'data/eco_driving_report.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'GET',
			params : { 
				id : 'eco',
				type : 'ecoindex_ecorate',
				duration : 12
			},
			success: function(response) {
			    var result = Ext.JSON.decode(response.responseText);

			    if(result.success) {
					var records = result.items;
					this.down('chart').getStore().setData(records);
					this.down('[itemId=report]').setData(records);
				} else {
				   	Ext.MessageBox.alert(T('label.failure'), result.msg);
				}
			},
			failure: function(response) {
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
	
			store : Ext.create('Ext.data.JsonStore', {
				fields: ['year', 'month', 'eco_index', 'eco_driving', 'yearmonth'],
				data : []
			}),
			
			axes : [ {
				type : 'category',
				position : 'bottom',
				fields : ['yearmonth'],
				title : T('label.month')
			}, {
				type : 'numeric',
				position : 'left',
				fields : ['eco_index'],
				title : T('label.eco_index') + '(%)',
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
				fields : ['eco_driving'],
				title : T('label.eco_driving') + '(%)',
				minimum : 0,
				label : {
					rotate : {
						degrees : -30
					}
				}
			} ],
			
			series : [ {
				type : 'line',
				fill : true,
				smooth : true,
				axis : 'right',
				xField : 'yearmonth',
				yField : 'eco_driving',
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
				fill: true,
				smooth : true,
				axis : 'left',
				xField : 'yearmonth',
				yField : ['eco_index'],
				label : {
					field : 'eco_index',
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
						'<th>'+ T('label.eco_index') +'</th>',
						'<th>'+ T('label.eco_driving') +'</th>',
					'</tr>',
					'<tpl for=".">',
					'<tr>',
						'<td class="alignCenter">{year}</td>',
						'<td class="alignCenter">{month}</td>',
						'<td class="alignCenter">{eco_index}</td>',
						'<td class="alignCenter">{eco_driving}</td>',
					'</tr>',
					'</tpl>',
				'</table>'
			]
		};
	}
});
