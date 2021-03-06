angular.module('bookings', ['ionic', 'bookings.controllers', 'bookings.services', 'bookings.filters', 'bookings.directive'])


.run(function($ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(['$httpProvider', function($httpProvider) {
   $httpProvider.defaults.withCredentials = true;
}])

.constant('bookingsConfig', {
    BASE_URL: 'http://www.114gh.cn/',
    ACTION: 'action/',
    // 获取部门列表
    DEPT_ACTION_URL: 'GetDeptList.ashx',
    // 获取医生列表
    DOCTER_ACTION_URL: 'GetDoctor_SC.ashx',
    // 医生出诊安排
    DOCTER_SCHEDULE: 'GetTheArrange.ashx',
    // 用户预约历史
    USER_REG_LIST: 'GetRegList.ashx',
    //校验码
    VCODE: 'GetRegCode.aspx',
    //检测用户账号信息
    VALID_CARD: 'Valid_SC.ashx',
    // 预约医生
    REG_URL: 'Reg_SC.ashx',
    // 取消预约
    WITHDRAW_URL: 'TuiHao_SC.ashx'
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider


    .state('bookings', {
        url: "/bookings",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('bookings.login', {
        url: '^/login',
        views: {
            'bookings-hospitals': {
                templateUrl: 'templates/bookings-login.html',
                controller: 'LoginCtrl'
            }
        }
    })

    .state('bookings.depts', {
        url: '^/hospitals/:hostNo',
        views: {
            'bookings-hospitals': {
                controller: 'DeptsCtrl',
                templateUrl: 'templates/bookings-depts.html'
            }
        }
    })

    .state('bookings.doctors', {
        url: '^/hospitals/:hostNo/:deptNo?deptName',
        resolve: {
            deptName: ['$stateParams', function($stateParams) {
                return $stateParams.deptName;
            }]
        },
        views: {
            'bookings-hospitals': {
                controller: 'DoctorsCtrl',
                templateUrl: 'templates/bookings-doctors.html'
            }
        }
    })

    .state('bookings.schedule', {
        url: '^/hospitals/:hostNo/:deptNo/:doctorName/schedules?deptName',
        views: {
            'bookings-hospitals': {
                controller: 'ScheduleCtrl',
                templateUrl: 'templates/bookings-schedules.html'
            }
        }
    })

    .state('bookings.history', {
        url: '/history',
        views: {
            'bookings-history': {
                templateUrl: 'templates/bookings-history.html',
                controller: 'HistoryCtrl'
            }
        }
    })

    .state('bookings.profile', {
        url: '/profile',
        views: {
            'bookings-profile': {
                templateUrl: 'templates/bookings-profile.html',
                controller: 'ProfileCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});