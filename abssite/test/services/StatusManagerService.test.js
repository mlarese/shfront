describe('Status Manager test. The manager define states according to menù tree',function(){
    var Service,  $rootScope,
        pages={
            "dashboard_default":{
                "code":"dashboard_default",
                "template":"dashboard",
                "structure":{
                    "title":"default dashboard"
                },
                "widgets":[
                    {"code":"avgrevbook","width":"small","position":"1"},
                    {"code":"totrevxpaxseg","width":"large","position":"3"}
                ]
            },

            "dashboard_revenue":{
                "code":"dashboard_revenue",
                "template":"dashboard",
                "structure":{
                    "title":"revenue dashboard"
                },
                "widgets":[
                    {"code":"avgrevbook","width":"small","position":"1"},
                    {"code":"totrevxpaxseg","width":"large","position":"3"}
                ]
            }
        },
        menu={
            "1":{
                "id":"1",
                "name":"Dashboard",
                "iconurl":"glyphicon-signal",
                "url":"",
                "children":[
                    {
                        "id":"2",
                        "name":"Revenue by Rooms",
                        "iconurl":null,
                        "url":"/dashboard_rooms",
                        "children":[

                        ],
                        "menutype":"CONTENT"
                    },
                    {
                        "id":"3",
                        "name":"Revenue by Pax",
                        "iconurl":null,
                        "url":"/dashboard_pax",
                        "children":[

                        ],
                        "menutype":"CONTENT"
                    },
                    {
                        "id":"4",
                        "name":"Revenue",
                        "iconurl":null,
                        "url":"/dashboard_revenue",
                        "children":[

                        ],
                        "menutype":"CONTENT"
                    }
                ],
                "menutype":"LABEL"
            },
            "5":{
                "id":"5",
                "name":"Maurone",
                "iconurl":null,
                "url":"/dashboard_revenue",
                "children":[

                ],
                "menutype":"CONTENT"
            }
        };

    beforeEach(module('app'));
    beforeEach(inject(function (_StatusManagerService_,  _$rootScope_) {
        Service = _StatusManagerService_;
        $rootScope = _$rootScope_;
    }))

    it('Should be service configured', function () {
        expect(Service).toBeDefined();
    })

    it('Should define getStates',function(){
        expect(Service.getStates).toBeDefined();
        var res = Service.getStates(pages,menu);

        expect(res).toBeDefined();

    })

})