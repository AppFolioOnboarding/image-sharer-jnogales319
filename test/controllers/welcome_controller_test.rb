require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get welcome_index_url
    assert_response :success

    puts response.body
    assert_select 'h1', count: 1, text: 'Bienvenidos a localhost:3000!'
  end
end
