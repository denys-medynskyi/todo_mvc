var app = angular.module("app", ["ngResource"]);

app.factory('Todo', ['$resource', function($resource) {
return $resource('api/v1/todos/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

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


app.controller("MainCtrl", function ($scope, Todo){
  // index
  $scope.todos = Todo.query();
  $scope.createEnabled = true;
  $scope.updateEnabled = false;
  // create
  $scope.newTodo = new Todo();
  $scope.save = function(){
    $scope.todos.push({title: $scope.newTodo.title});
    $scope.newTodo.$save();
    $scope.newTodo = new Todo();
  }
  // delete
  $scope.delete = function(todo){
    Todo.delete(todo);
    _.remove($scope.todos, todo);
  }

  // update
  $scope.activeTodo = null;

  $scope.setActiveTodo = function(todo){
    console.log(todo);
    $scope.activeTodo = angular.copy(todo);
  };

  $scope.isActive = function(todo){
    return $scope.activeTodo != null && todo.id == $scope.activeTodo.id;
  }

  $scope.update = function(todo){
    index = _.findIndex($scope.todos, todo);
    $scope.todos = todo;
    Todo.update({ id:todo.id }, todo);
    $scope.activeTodo = null;
  }

  // events

  $scope.toggleActive = function(event) {
    $(event.target).toggleClass("active-input");
  }

  $scope.removeReadonly = function(event){
    $(event.target).removeAttr("readonly");
  }

  $scope.addReadonly = function(event){
    $(event.target).attr("readonly", "readonly");
  }
});
