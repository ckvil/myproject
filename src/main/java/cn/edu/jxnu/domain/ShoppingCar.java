package cn.edu.jxnu.domain;

import java.util.List;
import java.util.Objects;

/**
 * #Description ShoppingCar
 *
 * @author xh
 * #Date: 2023/4/1 10:02
 */

public class ShoppingCar {

    private Integer shoppingCarId;
    private Integer userId;
    private Integer merchandiseId;
    private String operaTime;

    private Merchandise merchandise;

    public Integer getShoppingCarId() {
        return shoppingCarId;
    }

    public void setShoppingCarId(Integer shoppingCarId) {
        this.shoppingCarId = shoppingCarId;
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

    public String getOperaTime() {
        return operaTime;
    }

    public void setOperaTime(String operaTime) {
        this.operaTime = operaTime;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    @Override
    public String toString() {
        return "ShoppingCar{" +
                "shoppingCarId=" + shoppingCarId +
                ", userId=" + userId +
                ", merchandiseId=" + merchandiseId +
                ", operaTime='" + operaTime + '\'' +
                ", merchandise=" + merchandise +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShoppingCar that = (ShoppingCar) o;
        return Objects.equals(shoppingCarId, that.shoppingCarId) && Objects.equals(userId, that.userId) && Objects.equals(merchandiseId, that.merchandiseId) && Objects.equals(operaTime, that.operaTime) && Objects.equals(merchandise, that.merchandise);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shoppingCarId, userId, merchandiseId, operaTime, merchandise);
    }
}