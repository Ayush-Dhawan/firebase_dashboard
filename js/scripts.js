credit cards table: 
[
  {
    "id": 1,
    "account_no": "xxxx-xxxx-xxxx-0964",
    "customer_id": 1,
    "product_id": 1,
    "img_src": "card1"
  },
  {
    "id": 2,
    "account_no": "xxxx-xxxx-xxxx-4531",
    "customer_id": 1,
    "product_id": 2,
    "img_src": "card2"
  },
  {
    "id": 3,
    "account_no": "xxxx-xxxx-xxxx-1097",
    "customer_id": 2,
    "product_id": 3,
    "img_src": "card3"
  },
  {
    "id": 4,
    "account_no": "xxxx-xxxx-xxxx-0124",
    "customer_id": 2,
    "product_id": 1,
    "img_src": "card1"
  },
  {
    "id": 5,
    "account_no": "xxxx-xxxx-xxxx-2525",
    "customer_id": 3,
    "product_id": 1,
    "img_src": "card1"
  },
  {
    "id": 6,
    "account_no": "xxxx-xxxx-xxxx-1545",
    "customer_id": 4,
    "product_id": 1,
    "img_src": "card1"
  }
]

credit vcard transactions table: 
[
  {
    "id": 1,
    "credit_card_id": 1,
    "credit_charge": 1100,
    "points_earned": 440,
    "category": "Travel",
    "status_processed": "new",
    "creation_date": "2020-09-17 18:47:52.69",
    "last_update_date": "2012-09-17 18:47:52.69"
  },
  {
    "id": 2,
    "credit_card_id": 1,
    "credit_charge": 10,
    "points_earned": 4,
    "category": "Travel",
    "status_processed": "new",
    "creation_date": "2012-09-17 18:47:52.69",
    "last_update_date": "2012-09-17 18:47:52.69"
  }
]



SELECT
    COALESCE(SUM(ct.points_earned) / 1.0, 0) AS credit_score
    FROM credit_cards c
    JOIN credit_card_transactions ct ON c.id = ct.credit_card_id
    WHERE c.customer_id = ?
    AND ct.creation_date >= strftime('%Y-%m-%d %H:%M:%S', 'now', '-10 years')
    AND ct.status_processed = 1;


this always returns {credit_score; 0}

fix
