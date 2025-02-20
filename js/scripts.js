The json has these fields

id, customerId, productId, creditCharge, pointsEarned, statusProcessed, creationDate, lastUpdateDate, category, multiplier, productName

please dont send everything to the excel, instead send Customer name, Credit Card Name, Category, Charge, Points, Processed Status, Transaction Date, customer name will simply be customer.name, dont worry for its logic its in rest of the code

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
  },
  {
    "id": 3,
    "credit_card_id": 3,
    "credit_charge": 20,
    "points_earned": 8,
    "category": "Gift Card",
    "status_processed": "new",
    "creation_date": "2012-09-17 18:47:52.69",
    "last_update_date": "2012-09-17 18:47:52.69"
  },
  {
    "id": 4,
    "credit_card_id": 2,
    "credit_charge": 200,
    "points_earned": 80,
    "category": "Experience",
    "status_processed": "new",
    "creation_date": "2012-09-17 18:47:52.69",
    "last_update_date": "2012-09-17 18:47:52.69"
  }
]
heres sample data of credit_card_transactions


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

heres credit cards table
