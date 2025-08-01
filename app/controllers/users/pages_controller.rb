class Users::PagesController < HighVoltage::PagesController
  layout 'users'
  before_action :authenticate_user!
end
