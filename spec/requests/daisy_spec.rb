require 'rails_helper'

RSpec.describe "Daisies", type: :request do
  describe "GET /sample_dashboard" do
    it "returns http success" do
      get "/daisy/sample_dashboard"
      expect(response).to have_http_status(:success)
    end
  end

end
