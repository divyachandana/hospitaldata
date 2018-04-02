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
      $scope.data = [];
      getData();
  }

  function getData(){
    const ref = firebase.database().ref().child('hospitaldata');
    $scope.data = $firebaseArray(ref);
  }

  $scope.addNewRow = function(){
    var newRow = {
      'name':'',
      'abg':0,
      'result':0,
      'vbg':0
    };

    $scope.data.$add(newRow);
  };

  $scope.calculateDiff = function(index){
    var data = $scope.data[index];
    var abg = data.abg;
    var vbg = data.vbg;
    var diff = abg - vbg;

    //$scope.data[index].name= data.name;
    //$scope.data[index].abg= abg;
    //$scope.data[index].vbg= vbg;
    $scope.data[index].result= parseFloat(diff).toFixed(2);
    $scope.data.$save(index);
  };

  $scope.deleteData = function(index){
    var item = $scope.data[index];
    $scope.data.$remove(item);
  };

  $scope.export = function(){
     function buildTableBody(data){
       var body = [
           [{text:'ID NO :', bold: true, color:'#008CBA', fontSize:14},{text:'Time of ABG', bold: true,color:'#008CBA', fontSize:14,colSpan:2},{text:''},{text:''}],
            [{text:'', },{text:'Time of VBG', bold: true, color:'#008CBA', fontSize:14,colSpan:2},{text:''},{text:''}],
            [{text:'', },{text:'Date', bold: true, color:'#008CBA', fontSize:14},{text:''},{text:''}],
            [{text:'Component', bold: true, color:'#008CBA', alignment:'left', fontSize:14},{text:'ABG', bold: true, color:'#008CBA', fontSize:14, alignment:'right'},{text:'Difference', bold: true, color:'#008CBA', fontSize:14, alignment:'right'},{text:'VBG', bold: true, color:'#008CBA', fontSize:14, alignment:'right'}],
           ];

       data.forEach(function(row){
         if(row.name || row.abg!=0 || row.result!=0|| row.vbg!=0){
           var eachRow = [];
           eachRow.push({text:row.name+'', alignment:'left'});
           eachRow.push({text:row.abg+'', alignment:'right'});
           eachRow.push({text:row.result+'', alignment:'right'});
           eachRow.push({text:row.vbg+'', alignment:'right'});
           body.push(eachRow);

         }
       });

      return body;
  }
   var docDefinition = {
         header: function(currentPage, pageCount, pageSize) {
       // you can apply any logic and return any valid pdfmake element
       // console.log(currentPage);
       return {
           margin:[10,20,20,10],
               columns: [
               {
                   fontSize: 14,
                   text: currentPage.toString(),
                    alignment:'right',
                    color:'#008CBA',
               }
       ]}
     },

       content:[
           {
               table: {
                   headerRows: 4,
                    widths: [ 75, 40, 90, 90 ],
                   body: buildTableBody($scope.data)

               },
       		layout: {
       				hLineWidth: function (i, node) {
       					return (i === 0 || i === node.table.body.length || i===3 || i===4 || i===28) ? 1 : 0;
       				},
       				vLineWidth: function (i, node) {
       					return (i === 0 || i === node.table.widths.length) ? 1 : 0;
       				},
       				hLineColor: function (i, node) {
       					return (i === 0 || i === node.table.body.length) ? '#008CBA' : '#008CBA';
       				},
       				vLineColor: function (i, node) {
       					return (i === 0 || i === node.table.widths.length) ? '#008CBA' : '#008CBA';
       				},
       				paddingLeft: function(i, node) { return 10; },
       				paddingRight: function(i, node) { return 10; },
       				paddingTop: function(i, node) { return 6; },
       				paddingBottom: function(i, node) { return 6; },
       				// fillColor: function (i, node) { return null; }
       			},
       // 		pageBreak: 'after'
           }
           ]

   };

   pdfMake.createPdf(docDefinition).download("results.pdf");
}

  initMain();
});
