angular.module('app')
        .service('ConfigurationService',

          function($log,  $rootScope){

              var widgetStore={   }  ,
                  getWidgetByKey = function(key){
                      return {id:1};
                  },
                  getWidgetTemplateName=function(type,version){
                      version=version||'1.0.1';
                      return 'components/'+ type+'/'+ type+'.html?v='+version;
                  }
                  getToolBarButtons = function(){
                      $log.info('ConfigurationService.toolBarButtons')
                      return [
                          {href:'#/home', icon:'icon-home-fill-1',badge:null},
                          {href:'index.html', icon:'fa-envelope',badge:null},
                          {href:'index.html', icon:'fa-lock',badge:'2'},
                          {href:'index.html', icon:'fa-sign-out',badge:7}
                      ];
                  },
                  getRouterConfig=function(){
                      var baseComposition={
                          navbar:'navbar'
                          ,sidebar:'sidebar'
                      };

                      return [
                          { path: '/' ,redirectTo: '/chart' },
                          { path: '/chart' ,components: angular.extend({ contentpage:'chartpage'  },baseComposition) },
                          { path: '/home' ,components: angular.extend({ contentpage:'homepage'  },baseComposition) }
                      ]
                  },
                  getFooter=function(){
                      return     '© 2015 MM-One Group S.r.l Via Calnova, 119 30020 Noventa di Piave (VENEZIA)' ;
                  },
                  getMainPage=function(){
                      return     {
                          title:'ABS dashboard'
                          ,navBar:false
                      } ;
                  },
                  getWidgets=function(pageType,section){
                      section=section||'default';

                      var data = {
                          dashboard: {
                              favorites:{
                                  left:[],
                                  center:[],
                                  right:[]
                              },
                              revenue: {
                                  left: [
                                      'openeddatefilter',
                                      'avgrevbook',
                                      'adrbook',
                                      'totrevxpaxseg',
                                      'totrevxresmon3ys'
                                  ],
                                  center: [],
                                  right: []
                              }
                          },
                          homepage:{
                              default: {
                                  left: [ ],
                                  center: [],
                                  right: []
                              }
                          },
                          quickreport: {
                              default: {
                                  left: [ 'revenuefacts'],
                                  center: [ 'revenuefacts301224'  ],
                                  right: []
                              }
                          }
                      };

                      return data[pageType][section];
                  },
                  getPageSections=function(){
                      var data = {
                          chartpage:{
                              active:'revenue',
                              list:[
                                  { id:'revenue'  }
                                  ,{ id:'room'  }
                                  ,{ id:'pax'   }
                                  ,{ id:'favorites'  }
                              ]
                          },
                          homepage:[]
                      }
                      return data ;
                  },
                  getLanguages=function(){
                      return [
                          {id:'it',description:'Italiano',active:true}
                          ,{id:'en',description:'English',active:true}
                          ,{id:'fr',description:'Francais',active:false}
                      ]
                  },
                  getStructures = function(){
                      return [

                          //,{id:'res-198',description:'Hotel Spessotto',locality:'Portogruaro'}
                          {id:'res-49',description:'Hotel Apogia Nice',locality:'Nice'}
                          ,{id:'res-50',description:'Hotel Apogia Paris',locality:'Paris'}
                          ,{id:'res-48',description:'Hotel Apogia Sirio',locality:'Mestre'}
                          //,{id:'res-30',description:'Parkhotel Annia',locality:'Tessera'}
                      ];
                  },
                  getUserAuth = function(){
                      return {
                          name:'apoadmin',
                          company:'Hotels',
                          icon:'../assets/images/man_128px.png',
                          logo:'../assets/images/logo.png',
                          structures:getStructures(),
                          pageSections:getPageSections()
                      }
                  }
              if(!$rootScope.widgetFacilities)
                  $rootScope.widgetFacilities={
                      getWidgetByKey:getWidgetByKey,
                      getWidgetTemplateName:getWidgetTemplateName
                  }

              return {
                  toolBarButtons:getToolBarButtons,
                  userAuth:getUserAuth,
                  routerConfig:getRouterConfig,
                  footer:getFooter,
                  mainPage:getMainPage,
                  widgets:getWidgets,
                  pageSections:getPageSections,
                  languages:getLanguages,
                  getWidgetByKey:getWidgetByKey,
                  getWidgetTemplateName:getWidgetTemplateName
              }
          }
    )
