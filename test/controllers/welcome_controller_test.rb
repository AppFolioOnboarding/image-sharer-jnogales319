require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get welcome_index_url
    assert_response :success

    assert_select 'a[href=?]', '/images/new', count: 1
  end
end
