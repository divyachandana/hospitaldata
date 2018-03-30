var hospitalApp = angular.module('hospitalApp', ['ngRoute', 'firebase']);

hospitalApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl :'hospitalDataTrack.html',
    controller : 'hospitalDataTrackController'
  });
});

hospitalApp.controller('hospitalDataTrackController', function($scope, $firebaseArray){
  function initMain(){
      // $scope.mainData = [{'name':'', 'abg':null, 'result':null, 'vbg':null}];
      //call get data
      $scope.data = [];
      getData();
  }

  function getData(){
    const ref = firebase.database().ref().child('hospitaldata');
    // $scope.ref = rootRef.child('row');
    $scope.data = $firebaseArray(ref);
    console.log($scope.data);
    // $scope.mainData = $scope.data;
  }

  $scope.addNewRow = function(){
    var newRow = {
      'name':'',
      'abg':0,
      'result':0,
      'vbg':0
    };
    // var a = $scope.mainData.length;
    // $scope.rootRef.child(a).set(newRow);
    $scope.data.$add(newRow);
    //getData();
    // $scope.mainData.push(newRow);
  };

  // $scope.saveData = function(){
    //call post data
  // };

  $scope.calculateDiff = function(index){
    var data = $scope.data[index];
    var abg = data.abg;
    var vbg = data.vbg;
    var diff = abg - vbg;
    // $scope.mainData[index].result = diff;
    // data.result = diff;
    // var updatedData = {
    //   'name':data.name,
    //   'abg':data.abg,
    //   'result':diff,
    //   'vbg':data.vbg
    // }

    //$scope.data[index].name= data.name;
    //$scope.data[index].abg= abg;
    //$scope.data[index].vbg= vbg;
    $scope.data[index].result= parseFloat(diff).toFixed(2);
    // $scope.rootRef.child(index).set(updatedData);
    $scope.data.$save(index);
    //getData();
  };

  $scope.deleteData = function(index){
    var item = $scope.data[index];
    $scope.data.$remove(item);
    //getData();
  };

  initMain();
});
