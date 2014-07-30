Ext.define('FleetTouch.view.Header', {
	
	extend : 'Ext.TitleBar',
	
	xtype : 'header',
	
	config : {
		
		title : 'Fleet Touch',
		
		items : [
			{
				itemId : 'map',
				target : 'monitor_map',
				align : 'left',
				cls : 'headerView navMap',
				width : 50
			},
			{
				itemId : 'info',
				target : 'monitor_info',
				align : 'left',
				cls : 'headerView navInfo'
			},
			{
				itemId : 'incident',
				target : 'monitor_incident',
				align : 'left',
				cls : 'app.css'
			},
	        {
				itemId : 'setting',
	            iconCls : 'settings9',
	            iconMask : true,
	            align : 'right'
	        },
			{
	            iconCls : 'chat3',
	            iconMask : true,
	            align : 'right'
	        },
			{
				itemId : 'refresh',
	            iconCls : 'refresh',
	            iconMask : true,
	            align : 'right'
	        },
			{
				itemId : 'collapse',
	            iconCls : 'window',
	            iconMask : true,
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