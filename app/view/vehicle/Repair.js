Ext.define('FleetTouch.view.vehicle.Repair', {
	extend : 'Ext.tab.Panel',
	
	requires : [
		'FleetTouch.view.vehicle.RepairOverview',
		'FleetTouch.view.vehicle.RepairHistory',
		'FleetTouch.view.chart.vehicle.Mttr',
		'FleetTouch.view.chart.vehicle.Mtbf'
	],
	
	xtype : 'vehicle_repair',
		
	id : 'vehicle_repair',
	
	config : {
		tabBarPosition: 'top',
		items : [{
			xtype : 'vehicle_repair_overview',
			iconCls : 'tabConsumable',
			title : T('title.maintenance')
		}, {
			xtype : 'vehicle_repair_history',
			iconCls : 'tabTrace',
			title : T('title.maintenance_history')
		}, {
			xtype : 'vehicle_chart_mttr',
			iconCls : 'tabRepairTime',
			title : T('report.mttr')
		}, {
			xtype : 'vehicle_chart_mtbf',
			iconCls : 'tabConditionTerm',
			title : T('report.mtbf')
		}]
	},
		
	refresh: function() {
		var active = this.getActiveItem();
		if(active && typeof(active.refresh) === 'function') {
			active.refresh.call(active);
		}
	}
});