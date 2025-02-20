credit_cards table => id, account_no, customer_id, product_id, img_src

credit_card_transactions table => id, credit_card_id, credit_charge, points_earned, category, status_processed, creation_date, last_update_date (date format: 2020-09-17 18:47:52.69)

i want you to write a SQL query where i only provide customer_id and you fetch me its credit score
 The Credit Score should be calculated using the points earned (by processing the Transactions) over the last calendar year divided by 1200 - i.e. pointsEarned/1200

SELECT 
    c.customer_id,
    COALESCE(SUM(ct.points_earned) / 1200, 0) AS credit_score
FROM credit_cards c
JOIN credit_card_transactions ct ON c.id = ct.credit_card_id
WHERE c.customer_id = :customer_id
AND ct.creation_date >= DATEADD(YEAR, -1, GETDATE()) -- Last calendar year
AND ct.status_processed = 1 -- Only processed transactions
GROUP BY c.customer_id;

SELECT 
    c.customer_id,
    COALESCE(SUM(ct.points_earned) / 1200.0, 0) AS credit_score
FROM credit_cards c
JOIN credit_card_transactions ct ON c.id = ct.credit_card_id
WHERE c.customer_id = ? 
AND ct.creation_date >= strftime('%Y-%m-%d %H:%M:%S', 'now', '-1 year')
AND ct.status_processed = 1 -- Only processed transactions
GROUP BY c.customer_id;
