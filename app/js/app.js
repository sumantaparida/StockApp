var app = angular.module("stockapp",[]);

app.directive('stockdata', stockdata);
function stockdata() {
  var directive = {
         link: link,
         templateUrl: 'view/table.html',
         restrict: 'EA',
         controller: StockMarcketData,
         controllerAs: 'vm',
         bindToController: true
     };
     return directive;
     function link(scope, element, attrs) {
     }
   }

   StockMarcketData.$inject = ['$scope'];

  var golbalArray={};

  function update(data){
    var prevValue = golbalArray[data[0]].currValue
    golbalArray[data[0]].currValue = data[1];
    golbalArray[data[0]].prevValue = prevValue;
  }
  function insert(data){
    var temp ={};
    temp[data[0]]={};
    temp[data[0]].prevValue=0;
    temp[data[0]].name=data[0];
    temp[data[0]].currValue=data[1];
    golbalArray = Object.assign(golbalArray, temp);
  }
  function checkValue(data){
    if(golbalArray[data]) {
      return true;
    }
    return false;
  }
  function get(data){
    return golbalArray[data];
    //console.log(golbalArray[data]);
  }
  function dataTransfrom(data){
    var transfromData=[];
    data.forEach(function(ele,idx){
      if(checkValue(ele[0])){
        update(ele);
      }
      else{
        insert(ele);
      }
      transfromData.push(get(ele[0]));
    })
    return transfromData;
  }
  function StockMarcketData($scope) {
   $scope.obj = {};
    var exampleStocks = new WebSocket("ws://stocks.mnet.website/");
    exampleStocks.onmessage = function (event) {
      var stockcollection = [];
      stockcollection.push(JSON.parse(event.data));
      stockcollection.forEach(function(ele,idx,arr) {
        $scope.obj.name = dataTransfrom(ele);
        $scope.$apply();
      });
    };
  }
