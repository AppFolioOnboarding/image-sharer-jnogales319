require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  def test_url_is_valid_image__non_url_invalid
    image = Image.new(url: 'blah')

    assert_not_predicate image, :valid?

    assert_equal 'must be a valid image url.', image.errors[:url].first
  end

  def test_url_is_valid_image__non_image_url_invalid
    image = Image.new(url: 'https://www.google.com/')

    assert_not_predicate image, :valid?

    assert_equal 'must be a valid image url.', image.errors[:url].first
  end

  def test_url_is_valid_image__valid_url_valid_with_http
    image = Image.new(url: 'http://vignette.wikia.nocookie.net/sonic/images/4/45/Proto_Man_Profile.png/revision/latest/scale-to-width-down/350?cb=20161227222913')

    assert_predicate image, :valid?
  end

  def test_url_is_valid_image__valid_url_valid_with_https
    image = Image.new(url: 'https://vignette.wikia.nocookie.net/sonic/images/4/45/Proto_Man_Profile.png/revision/latest/scale-to-width-down/350?cb=20161227222913')

    assert_predicate image, :valid?
  end
end
