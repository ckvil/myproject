package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description Logistics
 *
 * @author xh
 * #Date: 2023/4/14 10:00
 */

public class Logistics {

    private Integer logisticsId;
    private Integer orderId;
    private String logisticsCode;
    private String logisticsMessages;
    private String updateTime;

    private Order order;

    public Integer getLogisticsId() {
        return logisticsId;
    }

    public void setLogisticsId(Integer logisticsId) {
        this.logisticsId = logisticsId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getLogisticsCode() {
        return logisticsCode;
    }

    public void setLogisticsCode(String logisticsCode) {
        this.logisticsCode = logisticsCode;
    }

    public String getLogisticsMessages() {
        return logisticsMessages;
    }

    public void setLogisticsMessages(String logisticsMessages) {
        this.logisticsMessages = logisticsMessages;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Logistics{" +
                "logisticsId=" + logisticsId +
                ", orderId=" + orderId +
                ", logisticsCode='" + logisticsCode + '\'' +
                ", logisticsMessages='" + logisticsMessages + '\'' +
                ", updateTime='" + updateTime + '\'' +
                ", order=" + order +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Logistics logistics = (Logistics) o;
        return Objects.equals(logisticsId, logistics.logisticsId) && Objects.equals(orderId, logistics.orderId) && Objects.equals(logisticsCode, logistics.logisticsCode) && Objects.equals(logisticsMessages, logistics.logisticsMessages) && Objects.equals(updateTime, logistics.updateTime) && Objects.equals(order, logistics.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(logisticsId, orderId, logisticsCode, logisticsMessages, updateTime, order);
    }
}