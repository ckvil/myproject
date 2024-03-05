package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Logistics;
import cn.edu.jxnu.mapper.LogisticsMapper;
import cn.edu.jxnu.service.LogisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * #Description ImpLogisticsService
 *
 * @author xh
 * #Date: 2023/4/14 10:19
 */

@Service
public class ImpLogisticsService implements LogisticsService {

    @Autowired
    LogisticsMapper logisticsMapper;

    @Override
    public Logistics logisticsMessages(Integer orderId) {
        Logistics expectLogistics;
        List<Logistics> logistics = logisticsMapper.findLogisticsByOrderId(orderId);
        if (logistics == null || logistics.size() == 0) {
            expectLogistics = null;
        } else {
            expectLogistics = logistics.get(0);
        }
        return expectLogistics;
    }
}