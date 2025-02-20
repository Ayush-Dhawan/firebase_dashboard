SELECT 
    COALESCE(SUM(ct.points_earned) / 1.0, 0) AS credit_score
FROM credit_cards c
JOIN credit_vcard_transactions ct ON c.id = ct.credit_card_id
WHERE c.customer_id = ?
AND ct.creation_date >= datetime('now', '-10 years')
AND ct.status_processed = 'new';
