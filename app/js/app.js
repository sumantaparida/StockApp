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
          // console.log(scope);
          // console.log(element);
          // console.log(attrs);
     }
   }

   StockMarcketData.$inject = ['$scope'];
   function StockMarcketData($scope) {
      var vim = this;
      console.log(vim.name);
      var exampleStocks = new WebSocket("ws://stocks.mnet.website/");
      exampleStocks.onmessage = function (event) {
        var stockcollection = [];
        stockcollection.push(JSON.parse(event.data));
        //console.log(stockcollection);
        stockcollection.forEach(function(ele,idx,arr){
          ele.forEach(function(ele,idx,arr){
            //console.log(ele);
            ele.forEach(function(ele,idx,arr){
              //$scope.name = "sumanta";
              //console.log($scope.name);
            })
          })
        });
      }
   }
