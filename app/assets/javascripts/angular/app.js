var app = angular.module("app", ["ngResource"]);

app.factory('Todo', ['$resource', function($resource) {
return $resource('api/v1/todos/:id', {},
    {
        'update': { method:'PUT' }
    });
}]);

app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus,
      function (newValue) {
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };
});

app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                          scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                }
            });
        };
});

app.directive('ngEscape', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 27) {
                        scope.$apply(function(){
                          scope.$eval(attrs.ngEscape);
                        });

                        event.preventDefault();
                }
            });
        };
});

app.controller("MainCtrl", function ($scope, $http, Todo){
  // index
  $scope.todos = Todo.query();
  // create
  $scope.newTodo = new Todo();
  $scope.save = function(newTodo){
    newTodo.$save(newTodo, function (response) {
                              $scope.todos.push(response);
                           });
    $scope.newTodo = new Todo();
  }
  // delete
  $scope.delete = function(todo){
    Todo.delete(todo);
    _.remove($scope.todos, todo);
  }

  $scope.update = function(editedTodo){
    console.log(editedTodo);
    index = _.findIndex($scope.todos, function(todo) {
      return todo.id == editedTodo.id;
    });
    $scope.todos[index] = editedTodo;
    Todo.update({ id: editedTodo.id }, editedTodo);
    $scope.activeTodo = null;
  }

  // active todo
  $scope.activeTodo = null;

  $scope.isActive = function(todo) {
    return $scope.activeTodo != undefined && $scope.activeTodo.id == todo.id;
  }

  $scope.setActiveTodo = function(todo) {
    $scope.activeTodo = angular.copy(todo);
  }

  $scope.resetChanges = function(editedTodo) {
    $scope.activeTodo = null;
  }

  $scope.toggleChecked = function(todo){
    var action = '';
    if(todo.completed){
      action = 'uncheck'
    } else {
      action = 'check'
    }
    $http.put("api/v1/todos/" + todo.id + '/' + action);
  }

  $scope.$watch('status', function (status) {
    console.log($scope.statusFilter);
    switch (status) {
      case 'all':
        return $scope.statusFilter = undefined;
      case "active":
          $scope.statusFilter = {completed: null};
          break;
      case "completed":
          $scope.statusFilter = {completed: true};
          break;
    }
	});

  $scope.setStatus = function(status) {
    $scope.status = status;
  }

});
