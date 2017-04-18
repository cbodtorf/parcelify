class CheckoutsUpdateJob < ApplicationJob
  @@test_order = nil

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    shop.with_shopify_session do
      @@test_order = OrderNote.new(webhook[:note_attributes])
      Rails.logger.info("[Order Notes] #{@@test_order.inspect}")
    end
  end

  def self.getOrder
    return @@test_order
  end

end
