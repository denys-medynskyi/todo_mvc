require 'test_helper'

class Api::V1::TodosControllerTest < ActionController::TestCase
  setup do
    @api_v1_todo = api_v1_todos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:api_v1_todos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create api_v1_todo" do
    assert_difference('Api::V1::Todo.count') do
      post :create, api_v1_todo: {  }
    end

    assert_redirected_to api_v1_todo_path(assigns(:api_v1_todo))
  end

  test "should show api_v1_todo" do
    get :show, id: @api_v1_todo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @api_v1_todo
    assert_response :success
  end

  test "should update api_v1_todo" do
    patch :update, id: @api_v1_todo, api_v1_todo: {  }
    assert_redirected_to api_v1_todo_path(assigns(:api_v1_todo))
  end

  test "should destroy api_v1_todo" do
    assert_difference('Api::V1::Todo.count', -1) do
      delete :destroy, id: @api_v1_todo
    end

    assert_redirected_to api_v1_todos_path
  end
end
