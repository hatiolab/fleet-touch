Ext.define('FleetTouch.view.Content', {
	
    extend : 'Ext.Panel',

    xtype : 'content',

    config : {
		title : 'FleetTouch',
		
		layout : 'card',
		
		items : [ {
			id : 'header',
			xtype : 'header',
			docked : 'top'
		}, {
			id : 'launch',
			cls : 'launchscreen',
			scrollable : true
		} ]
    }
});
