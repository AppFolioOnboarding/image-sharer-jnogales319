class Image < ApplicationRecord
  validate :url_is_valid_image

  def url_is_valid_image
    parsed_url = URI.parse(url)
    net_http = Net::HTTP.new(parsed_url.host, parsed_url.port)
    net_http.use_ssl = (parsed_url.scheme == 'https')

    validate_url(parsed_url, net_http)
  end

  private

  def validate_url(parsed_url, net_http)
    begin
      net_http.start do |http|
        return true if http.head(parsed_url.request_uri)['Content-Type'].start_with? 'image'
      end
    rescue StandardError
      add_invalid_image_error
      return
    end

    add_invalid_image_error
  end

  def add_invalid_image_error
    errors.add(:url, 'must be a valid image url.')
  end
end
