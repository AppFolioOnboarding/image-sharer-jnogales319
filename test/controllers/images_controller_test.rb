require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @test_url = 'http://www.maoartcorner.com/wp-content/uploads/2019/01/GlowFul.jpg'
  end

  def test_index__displays_create_new_link
    get images_url
    assert_response :success

    assert_select 'a[href=?]', '/images/new', count: 1
  end

  def test_index__shows_all_images
    Image.create!(url: @test_url)

    get images_url

    assert_select '.image__index_image', 1
  end

  def test_index__images_ordered_newest_to_oldest
    image1 = Image.create!(url: @test_url)
    image2 = Image.create!(url: @test_url)
    image3 = Image.create!(url: @test_url)

    get images_url

    image_tags = css_select('.image__index_image')
    image_tag_ids = image_tags.map do |image|
      image.attribute('data-id').text.to_i
    end

    assert_equal([image3.id, image2.id, image1.id], image_tag_ids)
  end

  def test_show__invalid_record_number
    assert_raises(ActiveRecord::RecordNotFound) do
      get image_url(-1)
    end
  end

  def test_show__valid_record_number
    Image.create!(url: @test_url)
    get image_url(Image.last.id)

    assert_select '.js-image-url', value: @test_url
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
    post images_url, params: { 'image': { 'url': @test_url } }

    assert_redirected_to image_path(Image.last.id)
  end
end
