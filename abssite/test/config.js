/**
 * Created by mauro.larese on 17/07/2015.
 */
var jndi ={
    resource:{
        ENDPOINT_URI:'/panels/abssite/abs/api'
        //ENDPOINT_URI:'//servicehub.mm-one.com.localhost/platform'

    },
    router:{
        appLayout:'tpl/app.html'
        ,startUrl:'/app/home'
        ,states:[
            'home'
            ,'dashboard'
            ,'login'
            ,'quickreport'
        ]
    }
};

angular.module('app', [
    'commangular',
    'ngResource'
]);
