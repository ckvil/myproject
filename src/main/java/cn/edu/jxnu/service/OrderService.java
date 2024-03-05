package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.Order;

import java.util.List;

public interface OrderService {

    public List<Order> order(Order order);

    public List<Order> searchMyOrder(Integer userId, String orderState, String keyword);

    public Order findOrderByOrderId(Integer orderId);

    public int creatOrder(Order order);

    public int payment(Order order);

    public int deleteOrder(Order order);

}
