Ext.define('FleetTouch.controller.monitor.Track', {
    extend: 'Ext.app.Controller',

	requires : ['FleetTouch.view.monitor.Track'],
	
    config: {
        refs: {
            track : 'track',
			map : 'track map',
			buttonDays : 'track button',
			buttonToday : 'track button[itemId=today]',
			buttonYesterday : 'track button[itemId=yesterday]',
			buttonAgo2days : 'track button[itemId=ago2days]',
			buttonAgo3days : 'track button[itemId=ago3days]'
        },

        control: {
			track : {
				initialize : 'onInit',
				refresh : 'delayRefresh'
            },
			buttonDays : {
				tap : 'onButtonDays'
			}
        }
    },

	onInit : function() {
		var self = this;
		
		var now = new Date();
		this.getButtonToday().setData({date : Ext.Date.format(now, 'D Y-m-d')});
		now.setDate(now.getDate() - 1);
		this.getButtonYesterday().setData({date : Ext.Date.format(now, 'D Y-m-d')})
		now.setDate(now.getDate() - 1);
		this.getButtonAgo2days().setData({date : Ext.Date.format(now, 'D Y-m-d')})
		now.setDate(now.getDate() - 1);
		this.getButtonAgo3days().setData({date : Ext.Date.format(now, 'D Y-m-d')})
		
		function showPathMarkers() {
			var pathMarkers = self.getTrack().getPathMarkers();
			if(!pathMarkers)
				return;
			
			var density = Math.max(1, (16 - self.getMap().getMap().getZoom()) * 3);
			var x = 0;
			
			for(var i = 0;i < pathMarkers.length;i++) {
				setTimeout(function() {
					pathMarkers[x++].setOptions({
						visible : x % density ? false : true,
						animation : google.maps.Animation.DROP
					});
				}, i * 20);
			}
		}
		
		function unselectTrip() {
			self.getTrack().unselectTrip();
		}
		
		this.getTrack().on('painted', function() {
			switch(self.getTrack().config.queryOn) {
				case 'driver' :
					FleetTouch.setting.on('driver', self.refresh, self);
					break;
				case 'vehicle' :
					FleetTouch.setting.on('vehicle', self.refresh, self);
					break;
				default :
					FleetTouch.setting.on('driver', self.delayRefresh, self);
					FleetTouch.setting.on('vehicle', self.delayRefresh, self);
			}

			self.delayRefresh();
		});
		
		this.getTrack().on('erased', function() {
			switch(self.getTrack().config.queryOn) {
				case 'driver' :
					FleetTouch.setting.un('driver', self.refresh, self);
					break;
				case 'vehicle' :
					FleetTouch.setting.un('vehicle', self.refresh, self);
					break;
				default :
					FleetTouch.setting.un('driver', self.delayRefresh, self);
					FleetTouch.setting.un('vehicle', self.delayRefresh, self);
			}
		});
		
		this.getTrack().on('resize', function() {
			google.maps.event.trigger(self.getMap().getMap(), 'resize');
		});

		google.maps.event.addListener(self.getMap().getMap(), 'click', unselectTrip);
		google.maps.event.addListener(self.getMap().getMap(), 'zoom_changed', showPathMarkers);
	},

	onButtonDays: function(day) {
		var from, to;
		
		from = new Date();
		from.setHours(0);
		from.setMinutes(0);
		from.setSeconds(0);
		from.setMilliseconds(0);
		
		this.getButtonToday().removeCls('x-button-active');
		this.getButtonYesterday().removeCls('x-button-active');
		this.getButtonAgo2days().removeCls('x-button-active');
		this.getButtonAgo3days().removeCls('x-button-active');

		switch(day.getItemId()) {
			case 'today' :
				this.getButtonToday().addCls('x-button-active');
				break;
			case 'yesterday' :
				this.getButtonYesterday().addCls('x-button-active');
				from.setDate(from.getDate() - 1);
				break;
			case 'ago2days' :
				this.getButtonAgo2days().addCls('x-button-active');
				from.setDate(from.getDate() - 2);
				break;
			case 'ago3days' :
				this.getButtonAgo3days().addCls('x-button-active');
				from.setDate(from.getDate() - 3);
				break;
		}

		to = new Date(from.getTime() + 24 * 60 * 60 * 1000);

		this.from = from;
		this.to = to;
		
		this.refresh(day);
	},

	delayRefresh : function() {
		/*
		 	FleetTouch.setting 의 vehicle, driver 설정의 변경은 프로그래밍 적으로 연달아 발생할 가능성이 높다.
			각 변화에 바로바로 반영하기 보다는 한 스텝을 기다렸다가 모아서 처리하는 것이 효과적일 것이다.
			이 경우는 driver/vehicle 을 모두 queryOn하는 경우에만 적용된다.
			Track 컴포넌트의 queryOn 속성에 아무 설정을 하지 않는 경우이다.
		*/
		if(this.onProcessing)
			return;
			
		this.onProcessing = true;
		var self = this;
		setTimeout(function() {
			try {
				self.refresh();
			} finally {
				self.onProcessing = false;
			}
		}, 100);
	},

	refresh : function(day) {
		var self = this;
		
		if(!day || !this.from || !this.to) {
			var from, to;
			
			this.getButtonYesterday().removeCls('x-button-active');
			this.getButtonAgo2days().removeCls('x-button-active');
			this.getButtonAgo3days().removeCls('x-button-active');

			this.getButtonToday().addCls('x-button-active');

			from = new Date();
			from.setHours(0);
			from.setMinutes(0);
			from.setSeconds(0);
			from.setMilliseconds(0);

			to = new Date(from.getTime() + 24 * 60 * 60 * 1000);
			
			this.from = from;
			this.to = to;
		}
		
		var driver, vehicle;
		
		switch(this.getTrack().config.queryOn) {
			case 'driver' :
				driver = FleetTouch.setting.get('driver');
				break;
			case 'vehicle' :
				vehicle = FleetTouch.setting.get('vehicle');
				break;
			default :
				driver = FleetTouch.setting.get('driver');
				vehicle = FleetTouch.setting.get('vehicle');
		}

		var store = Ext.getStore('TrackStore');
		var filter = [{
			property : 'date',
			/* for Unix timestamp (in seconds) */
			value : Math.round(this.from.getTime() / 1000)
		}];

		if(driver) {
			filter.push({
				property : 'driver_id',
				value : driver
			});
		} 
		if(vehicle) {
			filter.push({
				property : 'vehicle_id',
				value : vehicle
			});
		}
		
		store.clearFilter(true);
		store.filter(filter);
		store.load(function(records) {
			self.refreshMap(records);
		});
	},
	
	refreshMap : function(records) {
		var self = this;
		var map = this.getMap().getMap();
		
		this.getTrack().resetTrackLines();
		this.getTrack().setTripMarkers(null);
		this.getTrack().resetPathMarkers();
		this.getTrack().clearInfoWindow();

		var trip;
		var traces = [];
		var bounds, latlng, last;
		var v = [];
		var distance = 0;

		// TODO PathMarkers must be here.
		Ext.Array.each(records, function(record) {
			if(!trip) {
				trip = new google.maps.Polyline({
					map : map,
					strokeColor : '#FF0000',
					strokeOpacity : 1.0,
					strokeWeight : 4
				});
				path = trip.getPath();
				if(last) {
					path.push(latlng);
					traces.push(last);
					v.push(last.get('velocity'));
				}
			}
			
			var lat = record.get('lat');
			var lng = record.get('lng');

			if(lat !== 0 || lng !== 0) {
				latlng = new google.maps.LatLng(lat, lng);
				if (!bounds)
					bounds = new google.maps.LatLngBounds(latlng, latlng);
				else
					bounds.extend(latlng);
			}
			
			// 30분 Gap은 새로운 Trip으로 판단한다.
			if(last && (last.get('trace_time') > record.get('trace_time') + 30 * 60 * 1000)) {
				var avg_v = Ext.Array.sum(v) / v.length;
				self.getTrack().addTrackLine(map, traces, trip, avg_v, distance);

				trip = null;
				path = [];
				traces = [];
				v = [];
				distance = 0;
			}
				
			if(trip) {
				path.push(latlng);
				traces.push(record);
				v.push(record.get('velocity'));
				if(traces.length > 1) {
					distance += FleetTouch.map.distance(last.get('lat'), last.get('lng'), record.get('lat'), record.get('lng'), 'K');
				}
			}

			last = record;
		});

		if (!bounds) {
			var defaultLatlng = new google.maps.LatLng(System.props.lat, System.props.lng);
			bounds = new google.maps.LatLngBounds(defaultLatlng, defaultLatlng);

			var content = [
				'<div class="bubbleWrap">',
				'<div>기간내 주행이력이 없습니다.</div>',
				'</div>'
			].join('');

			if(!this.getTrack().getInfoWindow()) {
				this.getTrack().setInfoWindow(FleetTouch.label.create({
					map : map,
					xoffset : -110,
					yoffset : -100
				}));
			} else {
				this.getTrack().getInfoWindow().setMap(map);
			}
			this.getTrack().getInfoWindow().set('position', defaultLatlng);
			this.getTrack().getInfoWindow().set('text', content);

			this.getTrack().getInfoWindow().setVisible(true);
		} else {
			var avg_v = Ext.Array.sum(v) / v.length;
			this.getTrack().addTrackLine(map, traces, trip, avg_v, distance);
		}

		if (bounds.isEmpty() || bounds.getNorthEast().equals(bounds.getSouthWest())) {
			map.setCenter(bounds.getNorthEast());
		} else {
			map.fitBounds(bounds);
		}
	}
	
});
