class ImagesController < ApplicationController
  def index
    @images = Image.order(id: :desc)
    @images = @images.tagged_with(params[:tag]) if params[:tag].present?
  end

  def show
    @image = Image.find(params[:id])
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)

    if @image.save
      redirect_to @image
    else
      render :new
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy

    redirect_to images_url
  end

  private

  def image_params
    params.require(:image).permit(:url, :tag_list)
  end
end
