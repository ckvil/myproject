package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Order;
import cn.edu.jxnu.domain.ShoppingCar;
import cn.edu.jxnu.mapper.OrderMapper;
import cn.edu.jxnu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * #Description ImpOrderService
 *
 * @author xh
 * #Date: 2023/4/2 14:41
 */

@Service
public class ImpOrderService implements OrderService {

    @Autowired
    OrderMapper orderMapper;

    @Override
    public List<Order> order(Order order) {
        return orderMapper.queryUserOrder(order);
    }

    @Override
    public List<Order> searchMyOrder(Integer userId, String orderState, String keyword) {
        String merchandiseName="%"+keyword+"%";
        String merchandiseIntroduce="%"+keyword+"%";

        List<Order> orders1=orderMapper.findOrderByStateAndMerchandiseName(userId,orderState,merchandiseName);
        List<Order> orders2=orderMapper.findOrderByStateAndMerchandiseIntroduce(userId,orderState,merchandiseIntroduce);

        Set<Order> ordersSet = new HashSet<>();
        ordersSet.addAll(orders1);
        ordersSet.addAll(orders2);

        List<Order> orders = new ArrayList<>(ordersSet);
        return orders;
    }

    @Override
    public Order findOrderByOrderId(Integer orderId) {
        Order expectOrder;
        List<Order> orders=orderMapper.findOrderByOrderId(orderId);
        if (orders==null || orders.size()==0){
            expectOrder=null;
        }
        else {
            expectOrder=orders.get(0);
        }
        return expectOrder;
    }

    @Override
    public int creatOrder(Order order) {
        int i=orderMapper.insertOrder(order);
        return i;
    }

    @Override
    public int payment(Order order) {
        int u=orderMapper.updateOrder(order);
        return u;
    }

    @Override
    public int deleteOrder(Order order) {
        int u=orderMapper.updateOrder(order);
        return u;
    }

}