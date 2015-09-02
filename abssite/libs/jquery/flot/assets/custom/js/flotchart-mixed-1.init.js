(function($)
{
	if (typeof charts == 'undefined') 
		return;
	
	
	charts.chart_mixed_1={
		init:function(){
			var data = [ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ];

			this.plot=$.plot("#chart_mixed_1", [ data ], {
				series: {
					bars: {
						show: true,
						barWidth: 0.6,
						align: "center"
					}
				},
				xaxis: {
					mode: "categories",
					tickLength: 0
				}
			});	
			 
		}
		
	}
	
	 
	/*charts.chart_mixed_1 = 
	{
		// chart data
		data: 
		{
			d1: []
		},

		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			colors: [ "#dedede", primaryColor ],
			grid: {
				color: "#dedede",
			    borderWidth: 1,
			    borderColor: "transparent",
			    clickable: true, 
			    hoverable: true
			},
	        series: {
	        	grow: {active:false},
	            lines: {
            		show: true,
            		fill: false,
            		lineWidth: 2,
            		steps: false,
            		color: primaryColor
            	},
	            points: {show:false}
	        },
	        legend: { position: "nw", backgroundColor: null, backgroundOpacity: 0 },
	        yaxis: { 
	        	ticks:3, 
	        	tickSize: 40,
	        	tickFormatter: function(val, axis) { return val + "k";} 
	    	},
	        xaxis: { ticks:4, tickDecimals: 0, tickColor: 'transparent' },
	        shadowSize:0,
	        tooltip: true,
			tooltipOpts: {
				content: "%s : %y.0",
				shifts: {
					x: -30,
					y: -50
				},
				defaultTheme: false
			}
		},

		placeholder: "#chart_mixed_1",
		
		// initialize
		init: function()
		{	
			// generate some data
			this.data.d1 = [
				 ['Gen', 123]
				,['Feb', 245]
				,['Mar', 167]
				,['Apr', 190] 
			];
			
			// make chart
			this.plot = $.plot(
				this.placeholder, 
				[{
         			label: "Net Revenue.", 
         			data: this.data.d1,
         			bars: { show: true, fill: 1, barWidth: .75, align: "center" }
         		},
         		{
         			data: this.data.d1,
         			lines: { show: true, fill: false },
         			points: {
		            	show: true,
		            	radius: 5,
		            	symbol: "circle",
		            	fill: true,
		            	fillColor: primaryColor,
		            	borderColor: "#fff"
		            }
         		}], 
         		this.options);
		}
	};
*/
	$(window).on('load', function(){
		setTimeout(function(){
			//charts.chart_mixed_1.init();
		}, 100);
	});
	
})(jQuery);