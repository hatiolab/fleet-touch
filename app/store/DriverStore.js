Ext.define('FleetTouch.store.DriverStore', {
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
			name : 'name',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		}, {
			name : 'social_id',
			type : 'string'
		}, {
			name : 'title',
			type : 'string'
		}, {
			name : 'division',
			type : 'string'
		}, {
			name : 'phone_no',
			type : 'string'
		}, {
			name : 'mobile_no',
			type : 'string'
		}, {
			name : 'image_clip',
			type : 'string'
		}, {
			name : 'creator_id',
			type : 'string'
		}, {
			name : 'updater_id',
			type : 'string'
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
			url : window.location.pathname.indexOf('/m/') === 0 ? '/driver' : 'data/driver.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}		
	}

});