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
      // $scope.clickedPage;
      $scope.staticData = ["pH","pCO2","pO2","cHCO3","BE(ecf)","cSO2","AGap","GLu","Lac","Crea"];
      formBlankPage();
      $scope.getAllData();
      // getData();
  }

  function formBlankPage(){
    $scope.patientID = '';
    $scope.timeABG = '';
    $scope.timeVBG = '';
    $scope.date = '';
    $scope.page = '';
    // $scope.data = '';
    $scope.data = [];
    $scope.clickedPage=null;
    for(var i=0; i<$scope.staticData.length;i++){
      var eachData = {
        'name':$scope.staticData[i],
        'abg':0,
        'result':0,
        'vbg':0
      };
      $scope.data.push(eachData);
    }
  }

  $scope.getAllData = function(){
    $scope.ref = firebase.database().ref().child('totalhospitaldata');
    $scope.allData = $firebaseArray($scope.ref);
    // console.log($scope.allData);
  }
  $scope.saveStaticData = function(){
    if($scope.clickedPage && $scope.clickedPage>=0){
      // $scope.allData[$scope.clickedPage]. = ;
      // console.log($scope.allData[$scope.clickedPage]);
      var mydata = $scope.allData[$scope.clickedPage];
      mydata.patientID = $scope.patientID;
      mydata.timeABG = $scope.timeABG;
      mydata.timeVBG = $scope.timeVBG;
      mydata.doc = $scope.date;
      mydata.page = $scope.page;
      mydata.components = $scope.data;

      // console.log(mydata.$id)
      $scope.allData.$save(mydata);
      // $scope.allData.$save($scope.clickedPage).then(function($scope.ref) {
      //    $scope.ref.name() ===   $scope.allData[$scope.clickedPage].$id; //true
      // });
    } else{
      $scope.allData.$add({
        patientID: $scope.patientID,
        timeABG: $scope.timeABG,
        timeVBG: $scope.timeVBG,
        doc: $scope.date,
        page: $scope.page,
        components:$scope.data
      });
    }

    formBlankPage();
  };

  $scope.pageClick = function(index){
    $scope.clickedPage = index;
    // console.log(index);

    var pageData = $scope.allData[index];
    // console.log(pageData);
    $scope.patientID = pageData.patientID;
    $scope.timeABG = pageData.timeABG;
    $scope.timeVBG = pageData.timeVBG;
    $scope.date = pageData.doc;
    $scope.page = pageData.page;
    $scope.data = pageData.components;
  };

  // function getData(){
  //   const ref = firebase.database().ref().child('hospitaldata');
  //   $scope.data = $firebaseArray(ref);
  // }

  $scope.addNewRow = function(){
    var newRow = {
      'name':'',
      'abg':0,
      'result':0,
      'vbg':0
    };

    // $scope.data.$add(newRow);
    $scope.data.push(newRow);
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
    // $scope.data.$save(index);
  };

  $scope.deleteData = function(index){
    // var item = $scope.data[index];
    $scope.data.splice(index,1);
    // $scope.data.$remove(item);
    // $scope.data.$remove(item);
  };

  // $scope.clear = function(){
  //
  // }

  $scope.export = function(){

  //   var date = '';
  //   var patientid = $scope.patientID ? $scope.patientID : '';
  //   var timeABG = $scope.timeABG ? $scope.timeABG : '';
  //   var timeVBG = $scope.timeVBG ? $scope.timeVBG : '';
  //   var page = $scope.page ? $scope.page : '';
  //   if($scope.date){
  //     var day = $scope.date.getDate();
  //     var month = $scope.date.getMonth();
  //     var year = $scope.date.getFullYear();
  //     date = day +'/'+month+'/'+year;
  //   }
  //
  //    function buildTableBody(data){
  //      var body = [
  //          [{text:'ID NO : '+patientid, bold: true, color:'#008CBA', fontSize:12,colSpan:2},{},{text:'Time of ABG: '+timeABG, bold: true,color:'#008CBA', fontSize:12},{text:page+'',color:'#008CBA', alignment:'right'}],
  //           [{text:'', },{text:''},{text:'Time of VBG: '+timeVBG, bold: true, color:'#008CBA', fontSize:12,colSpan:2},{text:''}],
  //           [{text:'', },{text:''},{text:'Date of Collection : '+date, bold: true, color:'#008CBA', fontSize:12,colSpan:2},{}],
  //           [{text:'Component', bold: true, color:'#008CBA', alignment:'center', fontSize:14},{text:'ABG', bold: true, color:'#008CBA', fontSize:14, alignment:'center'},{text:'Difference', bold: true, color:'#008CBA', fontSize:14, alignment:'center'},{text:'VBG', bold: true, color:'#008CBA', fontSize:14, alignment:'center'}],
  //          ];
  //
  //      data.forEach(function(row){
  //        if(row.name || row.abg!=0 || row.result!=0|| row.vbg!=0){
  //          var eachRow = [];
  //          eachRow.push({text:row.name+'', alignment:'center'});
  //          eachRow.push({text:row.abg+'', alignment:'center'});
  //          eachRow.push({text:row.result+'', alignment:'center'});
  //          eachRow.push({text:row.vbg+'', alignment:'center'});
  //          body.push(eachRow);
  //
  //        }
  //      });
  //
  //     return body;
  // }
   // var docDefinition = {
   //   //     header: function(currentPage, pageCount, pageSize) {
   //   //   // you can apply any logic and return any valid pdfmake element
   //   //   // console.log(currentPage);
   //   //   return {
   //   //       margin:[10,20,20,10],
   //   //           columns: [
   //   //           {
   //   //               fontSize: 14,
   //   //               text: currentPage.toString(),
   //   //                alignment:'right',
   //   //                color:'#008CBA',
   //   //           }
   //   //   ]}
   //   // },
   //
   //     content:[
   //         {
   //           margin:[110,20,10,10],
   //           columns :[{
   //
   //             table: {
   //               headerRows: 4,
   //               widths: [ 85, 50, 130, 50 ],
   //               body: buildTableBody($scope.data)
   //
   //             },
   //             layout: {
   //               hLineWidth: function (i, node) {
   //                 return (i === 0 || i === node.table.body.length || i===3 || i===4 || i===27) ? 1 : 0;
   //               },
   //               vLineWidth: function (i, node) {
   //                 return (i === 0 || i === node.table.widths.length) ? 1 : 0;
   //               },
   //               hLineColor: function (i, node) {
   //                 return (i === 0 || i === node.table.body.length) ? '#008CBA' : '#008CBA';
   //               },
   //               vLineColor: function (i, node) {
   //                 return (i === 0 || i === node.table.widths.length) ? '#008CBA' : '#008CBA';
   //               },
   //               paddingLeft: function(i, node) { return 10; },
   //               paddingRight: function(i, node) { return 10; },
   //               paddingTop: function(i, node) { return 6; },
   //               paddingBottom: function(i, node) { return 6; },
   //               // fillColor: function (i, node) { return null; }
   //             },
   //
   //           }]
   //     // 		pageBreak: 'after'
   //         }
   //         ]
   //
   // };

   function multipleTableBody(data){
           var body = [
           [{text:'ID NO : '+data.patientID, bold: true, color:'#008CBA', fontSize:12,colSpan:2},{},{text:'Time of ABG: '+data.timeABG, bold: true,color:'#008CBA', fontSize:12},{text:data.page+'',color:'#008CBA', alignment:'right'}],
            [{text:'', },{text:''},{text:'Time of VBG: '+data.timeVBG, bold: true, color:'#008CBA', fontSize:12,colSpan:2},{text:''}],
            [{text:'', },{text:''},{text:'Date of Collection : '+data.doc, bold: true, color:'#008CBA', fontSize:12,colSpan:2},{}],
            [{text:'Component', bold: true, color:'#008CBA', alignment:'center', fontSize:14},{text:'ABG', bold: true, color:'#008CBA', fontSize:14, alignment:'center'},{text:'Difference', bold: true, color:'#008CBA', fontSize:14, alignment:'center'},{text:'VBG', bold: true, color:'#008CBA', fontSize:14, alignment:'center'}],
           ];
    var comp = data.components;
       comp.forEach(function(row){
         if(row.name || row.abg!=0 || row.result!=0|| row.vbg!=0){
           var eachRow = [];
           eachRow.push({text:row.name+'', alignment:'center'});
           eachRow.push({text:row.abg+'', alignment:'center'});
           eachRow.push({text:row.result+'', alignment:'center'});
           eachRow.push({text:row.vbg+'', alignment:'center'});
           body.push(eachRow);

         }
       });

      return body;
}

function multipleTables(){
    var main = [];
    for(var i=0; i<$scope.allData.length;i++){
        main.push(
                    {
                margin:[110,20,10,10],
            columns:[{
                          table: {

                headerRows: 4,
                widths: [ 85, 50, 130, 50 ],
                body: multipleTableBody($scope.allData[i]),


            },
    		layout: {
    				hLineWidth: function (i, node) {
    					return (i === 0 || i === node.table.body.length || i===3 || i===4 || i===27) ? 1 : 0;
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
            }],

    		pageBreak: 'after'


        }
            );
    }
    return main;
}


var docDefinition = {
    content:multipleTables()
}


   pdfMake.createPdf(docDefinition).download("results.pdf");
}

  initMain();
});
