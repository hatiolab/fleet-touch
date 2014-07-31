Ext.define('FleetTouch.store.VehicleRunStore', {
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,

		remoteFilter : true,
		
		groupField : 'year',
		  
		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'domain_id',
			type : 'string'
		}, {
			name : 'vehicle_id',
			type : 'string'
		}, {
			name : 'vehicle',
			type : 'auto'
		}, {
			name : 'run_year',
			type : 'integer',
		}, {
			name : 'run_month',
			type : 'integer',		
		}, {
			name : 'run_dist',
			type : 'float'
		}, {
			name : 'run_time',
			type : 'integer'
		}, {
			name : 'consmpt',
			type : 'float'
		}, {
			name : 'co2_emss',
			type : 'float'
		}, {
			name : 'effcc',
			type : 'float'
		}, {
			name : 'eco_index',
			type : 'integer'			
		}, {
			name : 'sud_accel_cnt',
			type : 'integer'
		}, {
			name : 'sud_brake_cnt',
			type : 'integer'
		}, {
			name : 'eco_drv_time',
			type : 'integer'
		}, {
			name : 'ovr_spd_time',
			type : 'integer'
		}, {
			name : 'idle_time',
			type : 'integer'			
		}, {
			name : 'inc_cnt',
			type : 'integer'
		}, {
			name : 'oos_cnt',
			type : 'integer'
		}, {
			name : 'mnt_cnt',
			type : 'integer'
		}, {
			name : 'mnt_time',
			type : 'integer'
		}, {
			name : 'updated_at',
			type : 'date',
			dateFormat:'time'
		} ],

		sorters : [ {
			property : 'run_year',
			direction : 'ASC'
		},{
			property : 'run_month',
			direction : 'ASC'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf('/m/') === 0 ? '/vehicle_run' : 'data/vehicle_run.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}
	}

});