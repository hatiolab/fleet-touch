Ext.define('FleetTouch.store.VehicleGroupStore', {
	extend : 'Ext.data.Store',

	config : {
		pageSize : 1000,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'domain_id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		}, {
			name : 'vehicles',
			type : 'auto'
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
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf('/m/') === 0 ? '/vehicle_group' : 'data/vehicle_group.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}
	}
});