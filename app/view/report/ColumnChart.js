Ext.define('FleetTouch.view.report.ColumnChart', {
	extend : 'Ext.Carousel',
	
	xtype : 'rpt_column',
	
	requires: ['Ext.Carousel',
		'Ext.chart.Chart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        //'Ext.chart.series.Column',
		'Ext.data.JsonStore'],
		
	config : {
	    direction : 'vertical',
		cls : 'grayBg'
	},
	
	constructor : function(config) {
		var store = new Ext.create('Ext.data.JsonStore', {
		    fields: ['name', 'data1', 'data2', 'data3', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', 'iphone', 'android', 'ipad'],
		    data: this.generateData(5, 20)
		});
		
		config.items = [
			this.buildChart(store),
			this.buildTable(store)
		];
		
		this.callParent(arguments);
	},

	generateData : function(n, floor) {
	    var data = [],
	        i;

	    floor = (!floor && floor !== 0) ? 20 : floor;

	    for (i = 0; i < (n || 12); i++) {
	        data.push({
	            name: Ext.Date.monthNames[i % 12],
	            data1: Math.floor(Math.max((Math.random() * 100), floor)),
	            data2: Math.floor(Math.max((Math.random() * 100), floor)),
	            data3: Math.floor(Math.max((Math.random() * 100), floor)),
	            2003: Math.floor(Math.max((Math.random() * 100), floor)),
	            2004: Math.floor(Math.max((Math.random() * 100), floor)),
	            2005: Math.floor(Math.max((Math.random() * 100), floor)),
	            2006: Math.floor(Math.max((Math.random() * 100), floor)),
	            2007: Math.floor(Math.max((Math.random() * 100), floor)),
	            2008: Math.floor(Math.max((Math.random() * 100), floor)),
	            2009: Math.floor(Math.max((Math.random() * 100), floor)),
	            2010: Math.floor(Math.max((Math.random() * 100), floor)),
	            iphone: Math.floor(Math.max((Math.random() * 100), floor)),
	            android: Math.floor(Math.max((Math.random() * 100), floor)),
	            ipad: Math.floor(Math.max((Math.random() * 100), floor))
	        });
	    }
	    return data;
	},

	buildChart : function(store) {
		return {
			xtype : 'chart',
			store : store,
            themeCls: 'column1',
            animate: {
                easing: 'bounceOut',
                duration: 750
            },
            shadow: false,
			toolbar : null,
            gradients: [
                {
                    'id': 'v-1',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(212, 40, 40)'
                        },
                        100: {
                            color: 'rgb(117, 14, 14)'
                        }
                    }
                },
                {
                    'id': 'v-2',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(180, 216, 42)'
                        },
                        100: {
                            color: 'rgb(94, 114, 13)'
                        }
                    }
                },
                {
                    'id': 'v-3',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(43, 221, 115)'
                        },
                        100: {
                            color: 'rgb(14, 117, 56)'
                        }
                    }
                },
                {
                    'id': 'v-4',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(45, 117, 226)'
                        },
                        100: {
                            color: 'rgb(14, 56, 117)'
                        }
                    }
                },
                {
                    'id': 'v-5',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(187, 45, 222)'
                        },
                        100: {
                            color: 'rgb(85, 10, 103)'
                        }
                    }
                }
            ],
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['2009'],
                    minimum: 0,
                    maximum: 100,
                    label: {
                        renderer: function (v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Number of Hits'
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
                }
            ],
            series: [
                {
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    renderer: function (sprite, storeItem, barAttr, i, store) {
                        barAttr.fill = "url(#v-" + (i % colors.length + 1) + ")";
                        return barAttr;
                    },
                    label: {
                        field: '2009'
                    },
                    xField: 'name',
                    yField: '2009'
                }
            // ],
            // interactions: [
            //     {
            //         type: 'panzoom',
            //         axes: ['bottom']
            //     }
            ]
		};	
	},

	buildTable : function(store){
		return {
            xtype : 'panel',
			cls : 'paddingAll15',
			data : store.config.data,
			tpl: [
				'<table class=dataGrid>',
					'<tr>',
						'<th>'+ T('label.name') +'</th>',
						'<th>Data1</th>',
						'<th>Data2</th>',
						'<th>Data3</th>',
						'<th>2003</th>',
						'<th>2004</th>',
						'<th>2005</th>',
						'<th>2006</th>',
						'<th>2007</th>',
						'<th>2008</th>',
						'<th>2009</th>',
						'<th>2010</th>',
						'<th>iPhone</th>',
						'<th>Android</th>',
						'<th>iPad</th>',
					'</tr>',
					'<tpl for=".">',
					'<tr>',
						'<td>{name}</td>',
						'<td>{data1}</td>',
						'<td>{data2}</td>',
						'<td>{data3}</td>',
						'<td>{2003}</td>',
						'<td>{2004}</td>',
						'<td>{2005}</td>',
						'<td>{2006}</td>',
						'<td>{2007}</td>',
						'<td>{2008}</td>',
						'<td>{2009}</td>',
						'<td>{2010}</td>',
						'<td>{iphone}</td>',
						'<td>{android}</td>',
						'<td>{ipad}</td>',
					'</tr>',
					'</tpl>',
				'</table>'
			]	
        };
	}
});
