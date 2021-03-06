'use strict';

angular.module('app').controller('QuestionTypesController', ['$scope', '$G', '$diModal', '$diResource', '$http', 'toaster', function($scope, $G, $diModal, $diResource, $http, toaster) {
    $scope.data4Questions = [];
    $scope.goToUpdate = function(item) {
        var $ns = $scope.$new();
        $ns.item = item;
        var $q = $diModal.open({
            templateUrl: 'pages/app/questions/question-add.html',
            controller: 'addQuestionController',
            backdrop: true,
            // scope: $scope,
            size: 'md',
            scope: $ns,
        });
        $q.result.then(function() {
            $scope.search();
        });
    };
    $scope.goToDelete = function(item) {
        
    };
    $scope.add = function() {
        $diModal.open({
            templateUrl: 'pages/app/questions/question-add.html',
            controller: 'addQuestionController',
            backdrop: true,
            // scope: $scope,
            size: 'md'
        });
    };
    
    $scope.getListData = function(params) {
        params = params || {};
        $diResource.get({
            url: $G.listQuestionaires,
            data: {}
        }).then(function(res) {
            // debugger
            $scope.$apply(function () {
                $scope.data4Questions = res;
            });
        });
    };
    $scope.search = function() {
        $scope.getListData({});
    };
    $scope.search();
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };
    $scope.myData = [];
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        // debugger
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('mock/largeload.json').success(function (largeLoad) {    
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('mock/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
}]);
