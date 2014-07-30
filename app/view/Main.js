Ext.define('FleetTouch.view.Main', {
	
    extend: 'Ext.Container',

    xtype: 'main',

    requires: [
    	'Ext.navigation.View',
    	'Ext.navigation.Bar',
    	'FleetTouch.view.Nav',
    	'FleetTouch.view.Content',
		'FleetTouch.view.Header',
		'FleetTouch.view.monitor.Map',
		'FleetTouch.view.monitor.Info',
		'FleetTouch.view.monitor.Incident'
    ],

	constructor : function(config) {
		config = config || {};
		config.items = this.buildItems();
		
		this.callParent([config]);
		
		var self = this;
		
		FleetTouch.setting.on('dockPosition', function(value) {
			Ext.getCmp('nav').setDocked(FleetTouch.setting.get('dockPosition')).show();
		});
	},

	buildItems : function() {
        return [
        {
            id: 'nav',
			cls : 'nav',
            xtype: 'nav',
            docked: FleetTouch.setting.get('dockPosition'),
            width: 255
        },
        {
            id: 'content',
            xtype: 'content'
        }
        ]
	},
	
    config: {
        fullscreen: true,

        layout: {
            type: 'card'
        }
    }
});