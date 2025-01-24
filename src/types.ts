
export type SmartMoneyInfo = {
  id: number;
  name?: string;
  token_address: string;
  symbol?: string;
  logo?: string;
  weight?: number,
  chain_id?: number;
  smart_wallet_count?: number;
  smart_wallet_count_change?: number;
  x_feed_num?: number;
  x_feed_num_change?: number;
  market_value?: number;
  market_value_change?: number;
  home_page?: string;
  twitter_link?: string;
  telegram_link?: string;
  publisher?: string;
  launch_plat_name?: string;
  publish_time?: string;
  description?: string;
  
}

export interface FeedInfo {
  author_id?: string;
  create_at?: string;
  favorite_count?: number;
  followers_count?: number;
  id?: number;
  official?: number;
  profile_image_url?: string;
  quote_count?: number;
  reply_count?: number;
  retweet_count?: number;
  status?: number;
  text?: string;
  text_url?: string;
  token_address?: string;
  user_name?: string;
  name?: string;
  tweet_id?: string
  referenced_tweet_id?: string;
  type?: string; // replied_to quoted
}

export interface TwitterFeedInfo extends FeedInfo {
  related_tweets?: FeedInfo[]
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

export type SummaryInfo = {
  content: string;
  source: string;
  symbol: string;
  logo: string;
  token_address: string;
}