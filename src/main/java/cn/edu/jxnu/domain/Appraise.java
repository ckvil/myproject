package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description Appraise
 *
 * @author xh
 * #Date: 2023/3/28 13:39
 */

public class Appraise {
    private Integer appraiseId;
    private Integer orderId;
    private Integer anonymous;
    private String appraise;
    private Integer appraiseStart;
    private String appraiseTime;

    private Order order;

    public Integer getAppraiseId() {
        return appraiseId;
    }

    public void setAppraiseId(Integer appraiseId) {
        this.appraiseId = appraiseId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getAnonymous() {
        return anonymous;
    }

    public void setAnonymous(Integer anonymous) {
        this.anonymous = anonymous;
    }

    public String getAppraise() {
        return appraise;
    }

    public void setAppraise(String appraise) {
        this.appraise = appraise;
    }

    public Integer getAppraiseStart() {
        return appraiseStart;
    }

    public void setAppraiseStart(Integer appraiseStart) {
        this.appraiseStart = appraiseStart;
    }

    public String getAppraiseTime() {
        return appraiseTime;
    }

    public void setAppraiseTime(String appraiseTime) {
        this.appraiseTime = appraiseTime;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Appraise{" +
                "appraiseId=" + appraiseId +
                ", orderId=" + orderId +
                ", anonymous=" + anonymous +
                ", appraise='" + appraise + '\'' +
                ", appraiseStart=" + appraiseStart +
                ", appraiseTime='" + appraiseTime + '\'' +
                ", order=" + order +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appraise appraise1 = (Appraise) o;
        return Objects.equals(appraiseId, appraise1.appraiseId) && Objects.equals(orderId, appraise1.orderId) && Objects.equals(anonymous, appraise1.anonymous) && Objects.equals(appraise, appraise1.appraise) && Objects.equals(appraiseStart, appraise1.appraiseStart) && Objects.equals(appraiseTime, appraise1.appraiseTime) && Objects.equals(order, appraise1.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appraiseId, orderId, anonymous, appraise, appraiseStart, appraiseTime, order);
    }
}