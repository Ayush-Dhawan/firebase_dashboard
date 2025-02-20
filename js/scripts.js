credit_cards table => id, account_no, customer_id, product_id, img_src

credit_card_transactions table => id, credit_card_id, credit_charge, points_earned, category, status_processed, creation_date, last_update_date (date format: 2020-09-17 18:47:52.69)

i want you to write a SQL query where i only provide customer_id and you fetch me its credit score
 The Credit Score should be calculated using the points earned (by processing the Transactions) over the last calendar year divided by 1200 - i.e. pointsEarned/1200
