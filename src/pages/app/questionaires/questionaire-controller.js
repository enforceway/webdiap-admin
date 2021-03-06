'use strict';

angular.module('app').controller('QuestionaireController', [
    'svcConfirm', '$state', '$scope', '$G', '$diModal', '$diResource', '$http', 'toaster',
    function(svcConfirm, $state, $scope, $G, $diModal, $diResource, $http, toaster) {
    $scope.data4Questionaires = [];
    $scope.goToUpdate = function(item) {
        $state.go('app.updateQuestionaire', {
            questionaireId: item.id,
        });
    };
    $scope.$on('evt4SelectQuestions', function(args) {
        debugger
    })
    $scope.goToDelete = function(item) {
        var $q = svcConfirm.confirm();
        debugger
        $q.then(function(){
            debugger
        }).catch(function() {
            debugger
        });
    };
    $scope.add = function() {
        $state.go('app.addQuestionaire');
        // $diModal.open({
        //     templateUrl: 'pages/app/questionaires/questionaire-add.html',
        //     controller: 'addQuestionController',
        //     backdrop: true,
        //     // scope: $scope,
        //     size: 'lg'
        // });
    };
    
    $scope.getQuestionaires = function(params) {
        params = params || {};
        $diResource.get({
            url: $G.listQuestionaires,
            data: {
                pageNo: 1,
                pageSize: 10,
            }
        }).then(function(res) {
            $scope.$apply(function () {
                $scope.data4Questionaires = res;
            });
        });
    };
    $scope.search = function() {
        $scope.getQuestionaires({});
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
    // $scope.setPagingData = function(data, page, pageSize) {
    //     var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    //     debugger
    //     $scope.myData = pagedData;
    //     $scope.totalServerItems = data.length;
    //     if (!$scope.$$phase) {
    //         $scope.$apply();
    //     }
    // };
    // $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    //     setTimeout(function () {
    //         var data;
    //         if (searchText) {
    //             var ft = searchText.toLowerCase();
    //             $http.get('mock/largeload.json').success(function (largeLoad) {    
    //                 data = largeLoad.filter(function(item) {
    //                     return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
    //                 });
    //                 $scope.setPagingData(data,page,pageSize);
    //             });            
    //         } else {
    //             $http.get('mock/largeLoad.json').success(function (largeLoad) {
    //                 $scope.setPagingData(largeLoad,page,pageSize);
    //             });
    //         }
    //     }, 100);
    // };

    // $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    // $scope.$watch('pagingOptions', function (newVal, oldVal) {
    //     if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
    //       $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //     }
    // }, true);
    // $scope.$watch('filterOptions', function (newVal, oldVal) {
    //     if (newVal !== oldVal) {
    //       $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //     }
    // }, true);

    // $scope.gridOptions = {
    //     data: 'myData',
    //     enablePaging: true,
    //     showFooter: true,
    //     totalServerItems: 'totalServerItems',
    //     pagingOptions: $scope.pagingOptions,
    //     filterOptions: $scope.filterOptions
    // };
}]);
