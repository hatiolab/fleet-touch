Ext.define('FleetTouch.controller.Report', {
    extend: 'Ext.app.Controller',

	requires : [ 
		'FleetTouch.view.report.DailyReport',
		'FleetTouch.view.report.DailyReport2',
		'FleetTouch.view.report.DailyReport3',
		'FleetTouch.view.report.MonthlyReport',
		'FleetTouch.view.report.VehicleHealth',
		'FleetTouch.view.report.EfficiencyReport',
		'FleetTouch.view.report.EcoDrivingReport',
		'FleetTouch.view.report.DrivingReport',
		'FleetTouch.view.report.EffccConsumptionReport',
		'FleetTouch.view.report.EcoDrivingHabitReport',
		'FleetTouch.view.report.MaintTrendReport'
	 ],

    config: {
        refs: {
			content : 'content',
			header : 'header',
			navReport :'nav_report'
        },
        control: {
            'nav_report' : {
                itemtap: 'onItemTap'
            }
        }
    },

    onItemTap: function(view, index, target, record) {
        this.showReport(record.get('reportId'));
    },

	showReport : function(report) {
		var view = this.getContent().getComponent(report);
		if(!view) {
			this.getContent().removeAll();
			view = this.getContent().add({
				xtype : report
			});
		}
		this.getContent().setActiveItem(view);
		this.getHeader().clearActiveStatus();
		
		return view;
	}
});