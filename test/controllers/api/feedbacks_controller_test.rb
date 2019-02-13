require 'test_helper'

class FeedbacksControllerTest < ActionDispatch::IntegrationTest
  def test_create__renders__message
    post api_feedbacks_url(userName: 'test', comments: 'otherTest')

    assert_response :ok
    assert_equal response.body, { message: 'Thanks for your feedback!' }.to_json
  end
end
