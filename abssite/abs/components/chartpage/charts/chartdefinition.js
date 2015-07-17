(function($) {
    charts.__colors=[  '#4D70B8', '#666666','#cccccc' ,'green','fuchsia','aqua'];

    var seriesBar={ bars: { fill:1, order: 1 ,show: true,   barWidth: 0.8,  align:'center'   }},
        seriesBarH={grow: {active:false}, bars: { horizontal: true,fill:1, align:'left', show: true,   barWidth: 0.9  }},
        legendSe= { position: "se", backgroundColor: null, backgroundOpacity: 0, noColumns: 12,show:false },
        legendHidden= {  show:false },
        gridDefaults= { color: "#dedede",   borderWidth: 1 ,    tickColor  :'white',  showLines: true },

        numberWithCommas=function numberWithCommas(x) {
            if(!x)x=0;
            return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ".");
        },
        font={ size: 11,  lineHeight: 15,  style: "normal",  weight: "bold",   family: "arial",    variant: "small-caps", color: "#545454"  },
        tickLength=0 ,
        aColors=charts.__colors,
        autoscaleMargin=0.05,
        axisLabelFontSizePixels=10,
        axisLabelFontFamily= 'Arial',
        plot= function(name){
            var chartData=charts.__data[name];
            var chartDef=charts.__def[name];

            if(!chartData) return;
            if(!chartDef) return;

            var data = chartData.series;
            var options=chartDef.options;
            var numOfBars = 0;
            var numOfSeries = 0;
            if(chartData.series)
                numOfSeries = chartData.series.length;

            if(chartData.labels) {
                numOfBars = chartData.labels.length;

                if(options.series && options.series.bars && options.series.bars.horizontal) {
                    //options.yaxis.ticks = chartData.labels;
                    options.yaxis.ticks=[];

                    for(var i=0;i<chartData.labels.length;i++) {
                        var val=numberWithCommas(chartData.values[i][1]);
                        var lbl=chartData.labels[i][1];
                        options.yaxis.ticks.push([chartData.labels[i][0],  lbl+' (' + val+')']);
                    }

                    options.xaxis.ticks=[];
                    for(var i=0;i<chartData.values.length;i++) {
                        var value=numberWithCommas(chartData.values[i][1]);
                        options.xaxis.ticks.push([chartData.labels[i][0],  value]);
                    }
                }else {

                    if(chartData.series.length>1) {
                        options.xaxis.ticks = chartData.labels;
                    }else{
                        options.xaxis.ticks=[];
                        for(var i=0;i<chartData.labels.length;i++) {
                            var val=numberWithCommas(chartData.values[i][1]);
                            var lbl=chartData.labels[i][1];
                            //options.xaxis.ticks.push([chartData.labels[i][0],  lbl+' (' + val+')']);
                            options.xaxis.ticks.push([chartData.labels[i][0],  lbl ]);
                        }
                    }

                }
            }
            var chartElements = $('.'+name+'-chart-element');

            if($('#' + name).size()>0) {
                chartElements.removeClass('chart-big-single-serie');
                chartElements.removeClass('chart-big-multiple-serie');

                if(numOfBars>12) {
                    if(numOfSeries>1)
                        chartElements.addClass('chart-big-multiple-serie');
                    else
                        chartElements.addClass('chart-big-single-serie');
                }

                chartDef.chart = $.plot($('#' + name), data, options);
            }
        };
        barOptions=  {
            colors: [   aColors[2]  ],
            grid: gridDefaults, series: seriesBar, legend: legendHidden,  shadowSize: 0,
            xaxis: {tickLength:tickLength,font:font  , ticks: 0, tickDecimals: 0,   autoscaleMargin: autoscaleMargin  },
            yaxis: {font:font,tickFormatter: numberWithCommas}
        },
        barHorOptions=  {
            colors: [   aColors[2]  ],
            grid: gridDefaults, series: seriesBarH, legend: legendHidden,  shadowSize: 0,
            xaxis: {tickLength:tickLength,font:font, ticks: 0,   autoscaleMargin: 0.1      },
            yaxis: { font:font, mode: "categories",    axisMargin: 1, autoscaleMargin:0.002   }
        },
        seriesOptions=  {
            grid: gridDefaults, colors: aColors,
            series: { bars: {  fill:1 , order: 1 ,show: true,   barWidth: 0.2,  align:'center' }  },
            legend: legendSe,  shadowSize: 0,
            xaxis: { tickLength_:tickLength,  font:font, ticks: 0,   autoscaleMargin: autoscaleMargin     },
            yaxis: {font:font,tickFormatter: numberWithCommas}
        }

	charts.__def={
        totrevxpaxseg : { chart: null,  options:seriesOptions   },
        totrevxresmon3ys : { chart: null,  options:  seriesOptions  },
        totrevxratcod : { chart: null,  options: seriesOptions  },
        avgrevxratcod : { chart: null,  options: seriesOptions  },
        totrevxroocod : { chart: null,  options: seriesOptions  }
    }

    charts.__plotAll=function () {
        for(key in charts.__def)  plot(key);
    };


})(jQuery);