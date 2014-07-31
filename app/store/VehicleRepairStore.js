Ext.define('FleetTouch.store.VehicleRepairStore', {
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,
		
		remoteFilter : true,

		pageSize : 1,

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
			name : 'next_repair_date',
			type : 'date',
			dateFormat : 'time'
		}, {
			name : 'repair_date',
			type : 'date',
			dateFormat : 'time'
		}, {
			name : 'repair_man',
			type : 'string'
		}, {
			name : 'repair_mileage',
			type : 'string'
		}, {
			name : 'repair_shop',
			type : 'string'
		}, {
			name : 'repair_time',
			type : 'string'
		}, {
			name : 'oos',
			type : 'string'
		}, {
			name : 'creator_id',
			type : 'integer'
		}, {
			name : 'updater_id',
			type : 'integer'
		}, {
			name : 'created_at',
			type : 'date',
			dateFormat:'time'
		}, {
			name : 'updated_at',
			type : 'date',
			dateFormat:'time'
		}],

		sorters : [ {
			property : 'repair_date',
			direction : 'DESC'
		} ],
		
		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf('/m/') === 0 ? '/repair' : 'data/vehicle_repair.json',
			extraParams : {
			},
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total',
				successProperty : 'success'
			}
		}
	}

});