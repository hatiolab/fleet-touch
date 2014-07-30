Ext.define('FleetTouch.view.report.EfficiencyReport', {
	
	extend : 'Ext.Carousel',
	
	xtype : 'rpt_effcc_trend',
	
	requires : ['Ext.Carousel',
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
		
		var url = window.location.pathname.indexOf('/m/') === 0 ? '/report/service' : 'data/efficiency_report.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'GET',
			params : { 
				id : 'fuel',
				type : 'effcc_trend',
				duration : 12
			},
			success : function(response) {
				var resultObj = Ext.JSON.decode(response.responseText);

				if(resultObj.success) {
					var records = resultObj.items;
					this.down('chart').getStore().setData(records);
					this.down('[itemId=report]').setData(records);

				} else {
					Ext.MessageBox.alert(T('label.failure'), resultObj.msg);
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
				labelFont : '17px Arial'
			},

			store : Ext.create('Ext.data.JsonStore', {
				fields : ['year', 'month', 'effcc', 'consmpt', 'yearmonth'],
				data : []
			}),
			
			axes : [ {
				type : 'category',
				position : 'bottom',
				fields : ['yearmonth'],
				title : T('label.month'),
				label : {
					rotate : {
						degrees : 315
					}
				}
			}, {
				type : 'numeric',
				position : 'left',
				fields : ['consmpt'],
				title : T('label.fuel_consumption') + '(ℓ)',
				minimum : 0
			}, {
				type : 'numeric',
				position : 'right',
				fields : ['effcc'],
				title : T('label.fuel_efficiency') + '(km/ℓ)',
				minimum : 0
			} ],
			
			series : [ {
				type : 'line',
				fill : true,
				smooth : true,
				axis : 'right',
				xField : 'yearmonth',
				yField : ['effcc'],
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
				fill : true,
				smooth : true,
				axis : 'left',
				xField : 'yearmonth',
				yField : ['consmpt'],
				label : {
					field : 'consmpt',
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
			itemId : 'report',
			cls : 'paddingAll15',
			data : {},
			tpl: [
				'<table class=dataGrid>',
					'<tr>',
						'<th>'+ T('label.year') + '/' + T('label.month') +'</th>',
						'<th>'+ T('label.fuel_efficiency') +'</th>',
						'<th>'+ T('label.fuel_consumption') +'</th>',
					'</tr>',
					'<tpl for=".">',
					'<tr>',
						'<td class="alignCenter">{year}/{month}</td>',
						'<td class="alignCenter">{effcc}</td>',
						'<td class="alignCenter">{consmpt}</td>',
					'</tr>',
					'</tpl>',
				'</table>'
			]
        };
	}
});
