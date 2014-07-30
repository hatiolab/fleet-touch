Ext.define('FleetTouch.controller.Main', {
    extend: 'Ext.app.Controller',

	requires : ['FleetTouch.view.Setting', 'FleetTouch.view.driver.Driver', 'FleetTouch.view.vehicle.Vehicle'],
	
    config: {
		routes : {
			map : 'onMap',
			info : 'onInfo',
			incident : 'onIncident'
		},
		
        refs: {
            main: 'main',
            nav: 'nav',
            content: 'content',
			header : 'header'
        },

        control: {
			'#ext-viewport':{
				orientationchange: 'onOC'
			},
			'#content' : {
				painted : 'onHome'
			},
            'header #map' : {
                tap: 'onMap'
            },
            'header #info' : {
                tap: 'onInfo'
            },
            'header #incident' : {
                tap: 'onIncident'
            },
			'header #collapse' : {
				tap : 'onCollapse'
			},
			'header #setting' : {
				tap : 'onSetting'
			},
			'header #refresh' : {
				tap : 'onRefresh'
			},
			
			'monitor_map' : {
				drivertap : 'onMapDriverTap',
				vehicletap : 'onMapVehicleTap',
				tracktap : 'onMapTrackTap'
			},
			'monitor_info #incidents button' : {
				tap : 'onIncident'
			},
			'monitor_info image' : {
				tap : 'onImage'
			},
			'monitor_incident image' : {
				tap : 'onImage'
			},
			
			'vehicle_summary' : {
				showMap : 'onShowMap',
				showTrack : 'onShowTrack'
            },

			'driver_summary' : {
				showMap : 'onShowMap',
				showTrack : 'onShowTrack'
			}

        }
    },

	onOC : function(me, newOrient,w,h) {
		if(newOrient === 'portrait') {
			this.getNav().setDocked(null).hide();
		} else {
			this.getNav().setDocked(FleetTouch.setting.get('dockPosition')).show();
		}
	},
	
	onHome : function() {
		FleetTouch.nav.monitor('monitor_map');
	},
	
    onMap: function(button, e) {
		FleetTouch.nav.monitor('monitor_map');
    },

	onInfo: function(button, e) {
		FleetTouch.nav.monitor('monitor_info');
    },
    
	onIncident: function(comp, e) {
		var view = FleetTouch.nav.monitor('monitor_incident');

		/* 여러 경로의 button동작을 통해서 들어오는 것을 감안함. */
		if(comp && comp.config && comp.config.incident)
			view.setIncident(comp.config.incident);
		else
			view.setIncident();
    },

    onCollapse : function(button, e) {
		if(this.getNav().getDocked()) {
			this.getNav().setDocked(null).hide();
		} else {
			this.getNav().setDocked(FleetTouch.setting.get('dockPosition')).show();
		}
	},

	onSetting : function(button, e) {
		Ext.create('FleetTouch.view.Setting', {}).showBy(button);
	},
	
	onRefresh : function(button, e) {
		var active = this.getContent().getActiveItem();
		if(typeof(active.refresh) === 'function')
			active.refresh();
	},
  	
    onMapTrackTap: function(vehicle) {
		FleetTouch.nav.monitor('monitor_info');

		FleetTouch.setting.set('monitoring_vehicle', vehicle.get('id'));
		FleetTouch.setting.set('vehicle', vehicle.get('id'));
		FleetTouch.setting.set('driver', vehicle.get('driver_id'));
    },

    onMapDriverTap: function(driver) {
		FleetTouch.setting.set('driver', driver.get('id'));

		FleetTouch.nav.driver();
    },

    onMapVehicleTap: function(vehicle) {
		FleetTouch.setting.set('vehicle', vehicle.get('id'));

		FleetTouch.nav.vehicle();
    },

	onImage : function(comp) {
		if(comp.config.itemId === 'driverImage')
			FleetTouch.nav.driver();
		else
			FleetTouch.nav.vehicle();
	},

    onShowMap: function(vehicle) {
		FleetTouch.nav.monitor('monitor_map');

		FleetTouch.setting.set('vehicle', vehicle);
    },

    onShowTrack: function(vehicle) {
		FleetTouch.nav.monitor('monitor_info');

		FleetTouch.setting.set('vehicle', vehicle);
    }

});
