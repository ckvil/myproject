package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.Order;
import cn.edu.jxnu.domain.ShoppingCar;
import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.OrderService;
import cn.edu.jxnu.service.ShoppingCarService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * #Description OrderController
 *
 * @author xh
 * #Date: 2023/4/2 14:40
 */

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    ShoppingCarService shoppingCarService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @RequestMapping("/myOrder")
    public Map<String, Object> allOrder(@SessionAttribute(value = "user") User user, @RequestParam(value = "orderState") String orderState) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Order order = new Order();
            order.setUserId(user.getUserId());
            order.setOrderState(orderState);

            List<Order> orders = orderService.order(order);

            if (orders == null || orders.size() == 0) {
                map.put("success", false);
                map.put("msg", "暂无商品~");
            } else {
                map.put("success", true);
                map.put("orders", orders);
            }
        }

        return map;
    }


    @RequestMapping("/searchMyOrder")
    public Map<String, Object> searchMyOrder(@SessionAttribute(value = "user") User user, @RequestParam(value = "orderState") String orderState, @RequestParam(value = "keyword") String keyword) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<Order> orders = orderService.searchMyOrder(user.getUserId(), orderState, keyword);

            if (orders == null || orders.size() == 0) {
                map.put("success", false);
                map.put("msg", "未搜索到商品~");
            } else {
                map.put("success", true);
                map.put("orders", orders);
            }
        }

        System.out.println(map);
        return map;
    }


    @RequestMapping("/creatOrder")
    @Transactional(rollbackFor = Exception.class)  // 事务回滚
    public Map<String,Object> creatOrder(@SessionAttribute(value = "user") User user,
                                         @RequestParam(value = "merchandiseId") Integer merchandiseId,
                                         @RequestParam(value = "orderMerchandiseQuantity") Integer orderMerchandiseQuantity,
                                         @RequestParam(value = "merchandiseSpecifications") String merchandiseSpecifications,
                                         @RequestParam(value = "consigneeName") String consigneeName,
                                         @RequestParam(value = "consigneeTelephone") String consigneeTelephone,
                                         @RequestParam(value = "consigneeAddr") String consigneeAddr,
                                         @RequestParam(value = "consigneeRemark") String consigneeRemark,
                                         @RequestParam(value = "consigneePostalCode") String consigneePostalCode){
        Map<String,Object> map=new HashMap<>();
        if (user.getUserName()==null){
            map.put("success",false);
            map.put("msg","用户未登录~");
        }
        else {
            if (consigneePostalCode==""){
                consigneePostalCode="000000";
            }
            Order order=new Order();
            order.setUserId(user.getUserId());
            order.setMerchandiseId(merchandiseId);
            order.setOrderMerchandiseQuantity(orderMerchandiseQuantity);
            order.setMerchandiseSpecifications(merchandiseSpecifications);
            order.setOrderTime(sdf.format(new Date()));
            order.setConsigneeName(consigneeName);
            order.setConsigneeAddr(consigneeAddr);
            order.setConsigneeTelephone(consigneeTelephone);
            order.setConsigneeRemark(consigneeRemark);
            order.setConsigneePostalCode(consigneePostalCode);
            order.setOrderState("待付款");

            System.out.println(order);

            int i=orderService.creatOrder(order);

            if (i==0){
                map.put("success",false);
                map.put("msg","订单提交失败~");
            }
            else {
                map.put("success",true);
                map.put("order",order);
                map.put("msg","订单提交成功~");
            }
        }

        System.out.println(map);
        return map;
    }


    @RequestMapping("/creatShoppingCarOrder")
    @Transactional(rollbackFor = Exception.class)  // 事务回滚
    public Map<String, Object> creatShoppingCarOrder(@SessionAttribute(value = "user") User user,
                                                     @RequestParam(value = "merchandises") String merchandises,
                                                     @RequestParam(value = "shoppingCars") String shoppingCars,
                                                     @RequestParam(value = "consigneeName") String consigneeName,
                                                     @RequestParam(value = "consigneeTelephone") String consigneeTelephone,
                                                     @RequestParam(value = "consigneeAddr") String consigneeAddr,
                                                     @RequestParam(value = "consigneeRemark") String consigneeRemark,
                                                     @RequestParam(value = "consigneePostalCode") String consigneePostalCode) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            if (consigneePostalCode == "") {
                consigneePostalCode = "000000";
            }

            JSONArray jsonArray = JSON.parseArray(merchandises);
            List<Order> grantPrivResultList = jsonArray.toJavaList(Order.class);

            System.out.println(shoppingCars);

            JSONArray jsonArray2 = JSON.parseArray(shoppingCars);
            List<ShoppingCar> grantPrivResultList2 = jsonArray2.toJavaList(ShoppingCar.class);

            List<Integer> orderIds = new ArrayList<>();

            try {
                for (Order order : grantPrivResultList) {
                    if (order.getMerchandiseId() != null) {
                        order.setUserId(user.getUserId());
                        order.setOrderTime(sdf.format(new Date()));
                        order.setConsigneeName(consigneeName);
                        order.setConsigneeAddr(consigneeAddr);
                        order.setConsigneeTelephone(consigneeTelephone);
                        order.setConsigneeRemark(consigneeRemark);
                        order.setConsigneePostalCode(consigneePostalCode);
                        order.setOrderState("待付款");
                        System.out.println(order);

                        // 提交订单
                        int i = orderService.creatOrder(order);

                        orderIds.add(order.getOrderId());
                    }
                }

                // 在购物车删除该商品
                for (ShoppingCar shoppingCar : grantPrivResultList2) {
                    if (shoppingCar.getShoppingCarId() != null) {
                        System.out.println(shoppingCar);
                        int d = shoppingCarService.deleteShoppingCar(shoppingCar.getShoppingCarId());
                        System.out.println(d);
                    }
                }
                System.out.println(orderIds);
                map.put("success", true);
                map.put("orderIds", orderIds);
                map.put("msg", "订单提交成功~");
            } catch (Exception e) {
                map.put("success", false);
                map.put("msg", "订单提交失败~");
                e.printStackTrace();
            }
        }

        System.out.println(map);
        return map;
    }


    @RequestMapping("/deleteOrder")
    public Map<String, Object> deleteOrder(@SessionAttribute(value = "user") User user,
                                       @RequestParam(value = "orderId") Integer orderId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {

            String orderState=orderService.findOrderByOrderId(orderId).getOrderState();

            Order order = new Order();
            order.setOrderId(orderId);
            order.setOrderTime(sdf.format(new Date()));
            order.setOrderState(orderState+"-已锁定");

            int i = orderService.deleteOrder(order);

            if (i == 0) {
                map.put("success", false);
                map.put("msg", "订单删除失败~");
            } else {
                map.put("success", true);
                map.put("order", order);
                map.put("msg", "订单删除成功~");
            }
        }

        System.out.println(map);
        return map;
    }


    @RequestMapping("/payment")
    public Map<String, Object> payment(@SessionAttribute(value = "user") User user,
                                       @RequestParam(value = "orderId") Integer orderId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Order order = new Order();
            order.setOrderId(orderId);
            order.setOrderTime(sdf.format(new Date()));
            order.setOrderState("待发货");

            int i = orderService.payment(order);

            if (i == 0) {
                map.put("success", false);
                map.put("msg", "订单支付失败~");
            } else {
                map.put("success", true);
                map.put("order", order);
                map.put("msg", "订单支付成功~");
            }
        }

        System.out.println(map);
        return map;
    }


}