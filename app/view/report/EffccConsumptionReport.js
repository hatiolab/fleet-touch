Ext.define('FleetTouch.view.report.EffccConsumptionReport', {
	
	extend : 'Ext.Panel',
	
	xtype : 'rpt_effcc_consmpt',
	
	requires : [
		'Ext.chart.Chart',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.chart.series.Pie',
		'Ext.chart.series.Scatter',
		'Ext.data.JsonStore'
	],
		
	config : {
		cls : 'grayBg',
		layout : 'fit'
	},

	constructor : function(config) {
		config.items = [ this.buildChart() ];
		
		this.callParent(arguments);
		
		var url = window.location.pathname.indexOf('/m/') === 0 ? '/report/service' : 'data/efficiency_report.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'GET',
			params : { 
				id : 'fuel',
				type : 'effcc_consmpt',
				duration : 12
			},
			success : function(response) {
				var result = Ext.JSON.decode(response.responseText);

				if(result.success) {
					var records = result.items;
					this.down('chart').getStore().setData(records);

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

			store : Ext.create('Ext.data.JsonStore', {
				fields : ['year', 'month', 'effcc', 'consmpt', 'yearmonth'],
				data : []
			}),
			
			axes : [ {
				type : 'numeric',
				position : 'bottom',
				fields : ['consmpt'],
				title : T('label.fuel_consumption') + '(ℓ)',
				minimum : 0
			}, {
				type : 'numeric',
				position : 'left',
				fields : ['effcc'],
				title : T('label.fuel_efficiency') + '(km/ℓ)',
				minimum : 0
			} ],
			
			series: [ {
				type: 'scatter',
				// fill: true,
				smooth: true,
				markerConfig: {
					radius: 5,
					size: 5
				},
				axis: 'left',
				highlight: true,
				xField: 'consmpt',
				yField: ['effcc']
			} ]
		};
	}

});