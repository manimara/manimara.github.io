
	var NessModule = angular.module('NessModule', []);

	NessModule.factory('getVehicleFactory', function(){
		allVechiles = [], vehicles = {};
		vehicles.getAll = function(){
				if ( totalVehicles = localStorage.getItem('vehiclesLength') )
				{
					for(i = 1; i <= totalVehicles; i++)
					{
						allVechiles[i] = JSON.parse(localStorage.getItem('vehicles_'+i));
					}
					console.log(allVechiles);
					allVechiles.shift();
				}
				return allVechiles;
			}
		return vehicles;
	});

	NessModule.controller('todoCtrl', ['$scope','getVehicleFactory', function($scope, getVehicleFactory ){		
		$scope.delete = function(){
			l = localStorage.vehiclesLength;
			for(var j=1; j < l; j++)
			{
				item = 'vehicles_'+j;
				if (localStorage.getItem(item))
					localStorage.removeItem(item);
			}
			localStorage.removeItem('vehiclesLength');
			$scope.getAllVechiles = [];
		};;

		$scope.optionsType = [{name:'New'}, {name:'Used'}, {name:'Cretified'}];

		$scope.addVechile = function(){
			if (! localStorage['vehiclesLength']){
				localStorage['vehiclesLength'] = 0 ;
			}
			var newVehicle ='{"type":"'+ $scope.vType.name +'", "make":"'+ $scope.vMake+'","model":"'+$scope.vModel+'"}';
			localStorage['vehiclesLength']++;
			num = localStorage.getItem('vehiclesLength');
			localStorage.setItem('vehicles_'+num,newVehicle);
			$scope.getAllVechiles.push(JSON.parse(newVehicle));
			$scope.vType = $scope.vMake = $scope.vModel = '';
		};

		$scope.getAllVechiles = getVehicleFactory.getAll();
		$scope.showJson = false;
		$scope.exportToJson = function(){
			$scope.showJson = true;
		}
		$scope.hideJson = function(){
			$scope.showJson = false;
		}
	}]);
