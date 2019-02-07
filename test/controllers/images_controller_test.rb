require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  def test_show__invalid_record_number
    assert_raises(ActiveRecord::RecordNotFound) do
      get image_url(-1)
    end
  end

  def test_show__valid_record_number
    test_url = 'http://www.maoartcorner.com/wp-content/uploads/2019/01/GlowFul.jpg'

    post images_url, params: { 'image': { 'url': test_url } }
    get image_url(Image.last.id)

    assert_select '.js-image-url', value: test_url
    assert_select '.js-image', 1
  end

  def test_new__basics_intact
    get new_image_url
    assert_response :success

    assert_select 'form', action: '/images', method: 'post'
    assert_select '.js-url-input', 1
    assert_select '.js-submit-button', value: 'Create Image'
  end

  def test_create__invalid_url_fails
    post images_url, params: { 'image': { 'url': 'https://www.google.com/' } }

    assert_select '.invalid-feedback',
                  text: 'Url must be a valid image url.',
                  count: 1
  end

  def test_create__proper_url_succeeds
    post images_url, params: {
      'image': { 'url': 'http://www.maoartcorner.com/wp-content/uploads/2019/01/GlowFul.jpg' }
    }

    assert_redirected_to image_path(Image.last.id)
  end
end
