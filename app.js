/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
	'FleetTouch': 'app',
	'FleetTouch.mixin': 'app/mixin'
});
//</debug>

Ext.define('FleetTouch', {
	singleton : true,
	mixins : {
		user : 'FleetTouch.mixin.User',
		subitem : 'FleetTouch.mixin.SubItem',
		setting : 'FleetTouch.mixin.Setting',
		label : 'FleetTouch.mixin.Label',
		nav : 'FleetTouch.mixin.Nav',
		map : 'FleetTouch.mixin.Map'
	}
});

Ext.application({
	
	name: 'FleetTouch',

	requires: [
		'Ext.MessageBox',
		'Ext.tab.Panel'
	],

	controllers: ['Main', 'Nav', 'Report', 'monitor.Track', 'monitor.Info'],
	
	stores: [
		'VehicleFilteredStore', 'VehicleStore', 'RecentIncidentStore', 
		'VehicleMapStore', 'DriverStore', 'DriverBriefStore', 
		'VehicleGroupStore', 'DriverGroupStore', 'TrackByVehicleStore', 
		'IncidentByVehicleStore', 'IncidentLogStore', 'VehicleConsumableStore', 
		'DriverRunStore', 'VehicleRunStore', 'YearStore', 'TrackStore', 
		'VehicleSummaryStore', 'DriverSummaryStore', 'VehicleRepairStore'
	],
	
	views: ['Main', 'Setting'],
	
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

		FleetTouch.setting.set('app_mode', (0 === window.location.pathname.indexOf('/m/')));
		FleetTouch.setting.set('version', '1.0');

		Ext.Ajax.request({
			url : (FleetTouch.setting.get('app_mode') === true) ? '../user/find' : 'data/user.json',
			success : function(response) {
				var user = Ext.JSON.decode(response.responseText);
				if(user.success && user.enabled) {
					FleetTouch.login.set(user);
			        Ext.Viewport.add(Ext.create('FleetTouch.view.Main'));
				} else {
					Ext.Msg.confirm('Unauthorized User', 'Do you want to move to registration page ?', function ( answer ) { 
						if( answer == 'yes') { 
							document.location.href = "/register";
						} else { 
							document.location.href = "/logout";
						}
					});
				}
			},
			failure : function(response) {
				if(response.status >= 400 && response.status < 500) {
					Ext.Msg.confirm('Unauthenticated User', 'Do you want to move to login page ?', function ( answer ) { 
						if( answer == 'yes') { 
							document.location.href = "/logout";
						}
					});
				} else {
					Ext.Msg.alert('ERROR', '[CODE: ' + response.status + '] ' + response.statusText);
				}
			}
		});
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
