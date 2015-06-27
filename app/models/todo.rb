class Todo < ActiveRecord::Base
  def check!
    update_column(:completed, true)
  end

  def uncheck!
    update_column(:completed, false)
  end
end
