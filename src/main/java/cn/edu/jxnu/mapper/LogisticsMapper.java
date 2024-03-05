package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Logistics;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LogisticsMapper {

    // 根据订单id查找物流信息
    public List<Logistics> findLogisticsByOrderId(Integer orderId);

}
