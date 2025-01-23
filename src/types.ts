
export type SmartMoneyInfo = {
  id: number;
  address: string
}

export type TwitterFeedInfo = {
  author_id: string;
  create_at: string;
  favorite_count: number;
  followers_count: number;
  id: number;
  official: number;
  profile_image_url: string;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  status: number;
  text: string;
  text_url: string;
  token_address: string;
  user_name: string;
  name: string;
}

export type TradeInfo = {
  address_from: string;
  address_to: string;
  chain_id: number;
  data_time: string;
  fee: string;
  fee_token: string;
  market_id: string;
  pool_address: string;
  price: string;
  price_token: string;
  token_from_address: string;
  token_from_volume: string;
  token_to_address: string;
  token_to_volume: string;
  trans_type: number;
  tx_id: string;
  wallet_tag: {
    address: string
  }
}