Ext.define('FleetTouch.view.Header', {
	
	extend : 'Ext.TitleBar',
	
	xtype : 'header',
	
	config : {
		
		title : 'ThingsFleet',
		items : [
			{
				itemId : 'brand-logo',
				align : 'left',
				xtype : 'image',
				html : '<img src="../fleet-touch/resources/images/brand-icon.png">',
				cls : 'brand-logo'
			},
			{
				itemId : 'map',
				target : 'monitor_map',
				align : 'right',
				text : 'map',
				cls : 'headerView navMap'
			},
			{
				itemId : 'info',
				target : 'monitor_info',
				align : 'right',
				text : 'info.',
				cls : 'headerView navInfo'
			},
			{
				itemId : 'incident',
				target : 'monitor_incident',
				align : 'right',
				text : 'incident',
				cls : 'headerView navIncident'
			},
	        {
				itemId : 'setting',
	            cls : 'headerSide settings9',
	            align : 'right'
	        },
			// {
 	        //  iconCls : 'chat3',
 	        //  iconMask : true,
 	        //  align : 'right'
 	        // },
			{
				itemId : 'refresh',
	            cls : 'headerSide refresh',
	            align : 'right'
	        },
			{
				itemId : 'collapse',
	            cls : 'headerSide window',
	            align : 'right'
	        }
	    ]
	},
	
	setActiveStatus : function(active) {
		/* active : active content view id */
		var button = this.down('button[target=' + active + ']');
		
		/* Header 내의 동일 그룹에서는 하나의 active 버튼이 있는 것으로 함. */
		Ext.Array.each(button.up().query('button'), function(item) {
			if(button === item)
				item.addCls('active');
			else
				item.removeCls('active');
		});
	},

	clearActiveStatus : function() {
		Ext.Array.each(this.query('button'), function(item) {
			item.removeCls('active');
		});
	}
});