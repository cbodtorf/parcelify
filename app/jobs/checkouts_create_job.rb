class CheckoutsCreateJob < ActiveJob::Base

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    shop.with_shopify_session do
      order_notes = webhook[:note_attributes]
      
    end
  end

end
