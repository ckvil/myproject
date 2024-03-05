package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Order;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMapper {

    // 查看所有订单(管理员)
    public List<Order> queryOrderList();

    // 查看个人订单(用户默认)
    public List<Order> queryUserOrder(Order order);

    // 根据订单状态和商品名称模糊查找
    public List<Order> findOrderByStateAndMerchandiseName(Integer userId, String orderState, String merchandiseName);

    // 根据订单状态和商品介绍模糊查找
    public List<Order> findOrderByStateAndMerchandiseIntroduce(Integer userId, String orderState, String merchandiseIntroduce);

    // 根据订单id查找订单(管理员)
    public List<Order> findOrderByOrderId(Integer orderId);

    // 根据商品id查找订单(管理员)
    public List<Order> findOrderByMerchandiseId(Integer merchandiseId);

    // 插入订单
    public int insertOrder(Order order);

    // 更新订单
    public int updateOrder(Order order);

}
