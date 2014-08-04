Ext.define('FleetTouch.view.report.EcoDrivingHabitReport', {
	
	extend : 'Ext.Panel',
	
	xtype : 'rpt_habit_ecoindex',
	
	requires: [
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
		
		var url = window.location.pathname.indexOf('/m/') === 0 ? '/report/service' : 'data/eco_driving_habit_report.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'GET',
			params : { 
				id : 'eco',
				type : 'habit_ecoindex',
				duration : 12
			},
			success: function(response) {
				var resultObj = Ext.JSON.decode(response.responseText);

				if(resultObj.success) {
					var records = resultObj.items;
					this.down('chart').getStore().setData(records);

				} else {
					Ext.MessageBox.alert(T('label.failure'), resultObj.msg);
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
			theme: 'Demo',
			animate: true,
			shadow: false,
			toolbar : null,
			flex : 1,

			store: Ext.create('Ext.data.JsonStore', {
				fields: ['eco_index', 'sud_cnt'],
				data : []
			}),
			
			axes: [ {
				type: 'numeric',
				position: 'bottom',
				fields: ['sud_cnt'],
				title: T('label.sudden_accel') + '/' + T('label.sud_brake_cnt'),
				minimum: 0
			}, {
				type: 'numeric',
				position: 'left',
				fields: ['eco_index'],
				title: T('label.eco_index') + '(%)',
				minimum: 0
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
				xField: 'sud_cnt',
				yField: ['eco_index']
			} ]
		};
	}

});
