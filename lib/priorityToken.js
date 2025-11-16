export const PRIORITY_TOKEN_AMOUNT_IN_PAISE = 50000;
export const PRIORITY_TOKEN_AMOUNT_IN_RUPEES = PRIORITY_TOKEN_AMOUNT_IN_PAISE / 100;

export const PRIORITY_TOKEN_CONTENT_DETAILS = {
  content_ids: ['priority-seat-token'],
  content_type: 'product',
  contents: [
    {
      id: 'priority-seat-token',
      quantity: 1,
      item_price: PRIORITY_TOKEN_AMOUNT_IN_RUPEES
    }
  ],
  currency: 'INR',
  num_items: 1,
  value: PRIORITY_TOKEN_AMOUNT_IN_RUPEES
};

export const PRIORITY_TOKEN_SESSION_STORAGE_KEY = 'mlzs_priority_token_purchase';
