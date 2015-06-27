class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy, :check, :uncheck]

  # GET /api/v1/todos
  # GET /api/v1/todos.json
  def index
    @todos = Todo.order(:created_at)
    render json: @todos
  end

  # GET /api/v1/todos/1
  # GET /api/v1/todos/1.json
  def show
    render json: @todo
  end

  # GET /api/v1/todos/new
  def new
    @todo = Todo.new
  end

  # GET /api/v1/todos/1/edit
  def edit
  end

  # POST /api/v1/todos
  # POST /api/v1/todos.json
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/todos/1
  # PATCH/PUT /api/v1/todos/1.json
  def update
    if @todo.update(todo_params)
      render json: {}, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/todos/1
  # DELETE /api/v1/todos/1.json
  def destroy
    @todo.destroy
    render json: {}, status: 204
  end

  def check
    @todo.check!
    render json: {}, status: :ok
  end

  def uncheck
    @todo.uncheck!
    render json: {}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit(:title)
    end
end
