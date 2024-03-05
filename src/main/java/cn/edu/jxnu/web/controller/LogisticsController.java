package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.Logistics;
import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.LogisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.HashMap;
import java.util.Map;

/**
 * #Description Logisticscontroller
 *
 * @author xh
 * #Date: 2023/4/14 10:04
 */

@RestController
@RequestMapping("/logistics")
public class LogisticsController {

    @Autowired
    LogisticsService logisticsService;

    @RequestMapping("/logisticsMessages")
    public Map<String, Object> logisticsMessages(@SessionAttribute(value = "user") User user, @RequestParam("orderId") Integer orderId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Logistics logistics = logisticsService.logisticsMessages(orderId);
            if (logistics == null) {
                map.put("success", false);
                map.put("msg", "订单查询失败~");
            } else {
                map.put("success", true);
                map.put("logistics", logistics);
            }

        }
        return map;
    }


}