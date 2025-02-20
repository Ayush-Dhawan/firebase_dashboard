@Service
public class TransactionService {

    @Autowired
    private TransactionMapper transactionMapper;

    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionService.class);

    public Map<String, Object> getCreditScoreByCustomerId(Long customerId) {
        Map<String, Object> result = transactionMapper.getCreditScoreByCustomerId(customerId);
        
        if (result == null || !result.containsKey("credit_score")) {
            result = new HashMap<>();
            result.put("credit_score", 0); // Ensure default value
        }

        LOGGER.info("Credit Score Response: " + result);
        return result;
    }
}
