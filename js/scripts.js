  <select id="getCreditScoreByCustomerId">
SELECT
COALESCE(SUM(ct.points_earned) / 1.0, 0) AS credit_score
FROM credit_cards c
JOIN credit_card_transactions ct ON c.id = ct.credit_card_id
WHERE c.customer_id = ?
AND ct.creation_date >= datetime('now', '-10 years')
  </select>


    public Map<String, Object> getCreditScoreByCustomerId(Long customerId) {
        try{
            LOGGER.info("mapper result: "+ transactionMapper.getCreditScoreByCustomerId(1L));
            return transactionMapper.getCreditScoreByCustomerId(customerId);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

 public Map<String, Object> getCreditScoreByCustomerId(Long customerId) {
        try{
            LOGGER.info("mapper result: "+ transactionMapper.getCreditScoreByCustomerId(1L));
            return transactionMapper.getCreditScoreByCustomerId(customerId);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;

    }

@GetMapping("/v1.0/transactions/getCreditScore/{customerId}")
    public Map<String, Object> getCreditScore(@PathVariable final Long customerId) {
        LOGGER.info("Request Received for [/transactions/getCreditScore]");
        return transactionService.getCreditScoreByCustomerId(customerId);
    }


                                              the sql query works now fix the other bitrs to get this output {credit_score: xxx}
