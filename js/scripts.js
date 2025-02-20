@RestController
@RequestMapping("/v1.0/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionController.class);

    @GetMapping("/getCreditScore/{customerId}")
    public ResponseEntity<Map<String, Object>> getCreditScore(@PathVariable Long customerId) {
        LOGGER.info("Request Received for [/transactions/getCreditScore] with customerId: " + customerId);
        Map<String, Object> response = transactionService.getCreditScoreByCustomerId(customerId);
        return ResponseEntity.ok(response);
    }
}
