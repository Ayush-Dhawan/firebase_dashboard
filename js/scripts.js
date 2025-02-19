package com.jpmorgan.et.mapper;

import com.jpmorgan.et.model.Fulfillment;
import com.jpmorgan.et.model.FulfillmentByCustomer;
import com.jpmorgan.et.model.FulfillmentFilter;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

/* TODO: Story #0.6
    - Note the use of the @Mapper MyBatis annotation
    - MyBatis will generate an implementation class for this interface
    - MyBatis will make the implementation class a Spring Bean
*/
@Mapper
public interface FulfillmentMapper {

    List<FulfillmentByCustomer> getFulfillmentByCustomerId(final Long customerId);
    List<FulfillmentByCustomer> getFulfillments();
    void addFulfillment(Fulfillment fulfillment);

    List<FulfillmentFilter> getFulfillmentFilteredData(
            @Param("stDate") ZonedDateTime stDate,
            @Param("endDate") ZonedDateTime endDate
    );

}
