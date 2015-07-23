describe('Charts Service load charts configurations (types of chart)',function(){
    var ChartConfigService,$httpBackend,
        mockResponse={
            "stacked_bars":{
                "bars": {
                    "barWidth": 0.8,
                    "align": "center",
                    "show": true,
                    "fill": 1,
                    "shadowSize": 0,
                    "lineWidth": 1,
                    "order": 1
                },
                "colors": ["#4D70B8", "#666666", "#cccccc", "green", "fuchsia", "aqua"],
                "series": {
                    "shadowSize": 0
                },
                "xaxis": {
                    "font": {
                        "color": "#aaa"
                    },
                    "autoscaleMargin": 0.1
                },
                "yaxis": {
                    "font": {
                        "color": "#ccc"
                    }
                },
                "legend": {
                    "show": false
                },
                "grid": {
                    "hoverable": false,
                    "clickable": false,
                    "borderWidth": 0,
                    "color": "#ccc"
                },
                "tooltip": true
            }
        };
    beforeEach( module('app' ));
    beforeEach(inject(function (_ChartConfigService_,_$httpBackend_) {
        ChartConfigService=_ChartConfigService_;
        $httpBackend=_$httpBackend_;
    }))

    it('Should be service configured',function(){
        expect(ChartConfigService).toBeDefined();
    })

    it('Should retrieve data',function(){
        var chartConf;
        $httpBackend.expectGET(ChartConfigService.endPoint).respond(200,mockResponse)
        ChartConfigService.load('stacked_bars').then(function (resp) {
            chartConf = resp;
        })
        $httpBackend.flush();
        expect(chartConf).toBeDefined();
    })
})