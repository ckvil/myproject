package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description Order
 * 订单实体类
 * @author xh
 * #Date: 2023/3/23 11:16
 */

public class Order {

    private Integer orderId;
    private Integer userId;
    private Integer merchandiseId;
    private Integer orderMerchandiseQuantity;
    private String merchandiseSpecifications;
    private String orderTime;
    private String consigneeName;
    private String consigneeAddr;
    private String consigneeTelephone;
    private String consigneeRemark;
    private String consigneePostalCode;
    private String orderState;

    private Merchandise merchandise;
    private User user;


    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public Integer getOrderMerchandiseQuantity() {
        return orderMerchandiseQuantity;
    }

    public void setOrderMerchandiseQuantity(Integer orderMerchandiseQuantity) {
        this.orderMerchandiseQuantity = orderMerchandiseQuantity;
    }

    public String getMerchandiseSpecifications() {
        return merchandiseSpecifications;
    }

    public void setMerchandiseSpecifications(String merchandiseSpecifications) {
        this.merchandiseSpecifications = merchandiseSpecifications;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public String getConsigneeName() {
        return consigneeName;
    }

    public void setConsigneeName(String consigneeName) {
        this.consigneeName = consigneeName;
    }

    public String getConsigneeAddr() {
        return consigneeAddr;
    }

    public void setConsigneeAddr(String consigneeAddr) {
        this.consigneeAddr = consigneeAddr;
    }

    public String getConsigneeTelephone() {
        return consigneeTelephone;
    }

    public void setConsigneeTelephone(String consigneeTelephone) {
        this.consigneeTelephone = consigneeTelephone;
    }

    public String getConsigneeRemark() {
        return consigneeRemark;
    }

    public void setConsigneeRemark(String consigneeRemark) {
        this.consigneeRemark = consigneeRemark;
    }

    public String getConsigneePostalCode() {
        return consigneePostalCode;
    }

    public void setConsigneePostalCode(String consigneePostalCode) {
        this.consigneePostalCode = consigneePostalCode;
    }

    public String getOrderState() {
        return orderState;
    }

    public void setOrderState(String orderState) {
        this.orderState = orderState;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", userId=" + userId +
                ", merchandiseId=" + merchandiseId +
                ", orderMerchandiseQuantity=" + orderMerchandiseQuantity +
                ", merchandiseSpecifications='" + merchandiseSpecifications + '\'' +
                ", orderTime='" + orderTime + '\'' +
                ", consigneeName='" + consigneeName + '\'' +
                ", consigneeAddr='" + consigneeAddr + '\'' +
                ", consigneeTelephone='" + consigneeTelephone + '\'' +
                ", consigneeRemark='" + consigneeRemark + '\'' +
                ", consigneePostalCode='" + consigneePostalCode + '\'' +
                ", orderState='" + orderState + '\'' +
                ", merchandise=" + merchandise +
                ", user=" + user +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(orderId, order.orderId) && Objects.equals(userId, order.userId) && Objects.equals(merchandiseId, order.merchandiseId) && Objects.equals(orderMerchandiseQuantity, order.orderMerchandiseQuantity) && Objects.equals(merchandiseSpecifications, order.merchandiseSpecifications) && Objects.equals(orderTime, order.orderTime) && Objects.equals(consigneeName, order.consigneeName) && Objects.equals(consigneeAddr, order.consigneeAddr) && Objects.equals(consigneeTelephone, order.consigneeTelephone) && Objects.equals(consigneeRemark, order.consigneeRemark) && Objects.equals(consigneePostalCode, order.consigneePostalCode) && Objects.equals(orderState, order.orderState) && Objects.equals(merchandise, order.merchandise) && Objects.equals(user, order.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, userId, merchandiseId, orderMerchandiseQuantity, merchandiseSpecifications, orderTime, consigneeName, consigneeAddr, consigneeTelephone, consigneeRemark, consigneePostalCode, orderState, merchandise, user);
    }
}