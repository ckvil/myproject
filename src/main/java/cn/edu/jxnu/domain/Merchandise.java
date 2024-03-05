package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description Merchandise
 * 商品实体类
 * @author xh
 * #Date: 2023/3/23 11:13
 */

public class Merchandise {

    private Integer merchandiseId;
    private Integer storeId;
    private String merchandiseName;
    private String merchandiseMainImage;
    private String merchandiseParticularsImage;
    private String merchandiseIntroduce;
    private String merchandiseParameter;
    private String merchandiseSpecifications;
    private String merchandisePrice;
    private Integer merchandiseQuantity;
    private String  merchandiseState;
    private String  operaTime;

    private Store store;

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    public String getMerchandiseMainImage() {
        return merchandiseMainImage;
    }

    public void setMerchandiseMainImage(String merchandiseMainImage) {
        this.merchandiseMainImage = merchandiseMainImage;
    }

    public String getMerchandiseParticularsImage() {
        return merchandiseParticularsImage;
    }

    public void setMerchandiseParticularsImage(String merchandiseParticularsImage) {
        this.merchandiseParticularsImage = merchandiseParticularsImage;
    }

    public String getMerchandiseIntroduce() {
        return merchandiseIntroduce;
    }

    public void setMerchandiseIntroduce(String merchandiseIntroduce) {
        this.merchandiseIntroduce = merchandiseIntroduce;
    }

    public String getMerchandiseParameter() {
        return merchandiseParameter;
    }

    public void setMerchandiseParameter(String merchandiseParameter) {
        this.merchandiseParameter = merchandiseParameter;
    }

    public String getMerchandiseSpecifications() {
        return merchandiseSpecifications;
    }

    public void setMerchandiseSpecifications(String merchandiseSpecifications) {
        this.merchandiseSpecifications = merchandiseSpecifications;
    }

    public String getMerchandisePrice() {
        return merchandisePrice;
    }

    public void setMerchandisePrice(String merchandisePrice) {
        this.merchandisePrice = merchandisePrice;
    }

    public Integer getMerchandiseQuantity() {
        return merchandiseQuantity;
    }

    public void setMerchandiseQuantity(Integer merchandiseQuantity) {
        this.merchandiseQuantity = merchandiseQuantity;
    }

    public String getMerchandiseState() {
        return merchandiseState;
    }

    public void setMerchandiseState(String merchandiseState) {
        this.merchandiseState = merchandiseState;
    }

    public String getOperaTime() {
        return operaTime;
    }

    public void setOperaTime(String operaTime) {
        this.operaTime = operaTime;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    @Override
    public String toString() {
        return "Merchandise{" +
                "merchandiseId=" + merchandiseId +
                ", storeId=" + storeId +
                ", merchandiseName='" + merchandiseName + '\'' +
                ", merchandiseMainImage='" + merchandiseMainImage + '\'' +
                ", merchandiseParticularsImage='" + merchandiseParticularsImage + '\'' +
                ", merchandiseIntroduce='" + merchandiseIntroduce + '\'' +
                ", merchandiseParameter='" + merchandiseParameter + '\'' +
                ", merchandiseSpecifications='" + merchandiseSpecifications + '\'' +
                ", merchandisePrice='" + merchandisePrice + '\'' +
                ", merchandiseQuantity=" + merchandiseQuantity +
                ", merchandiseState='" + merchandiseState + '\'' +
                ", operaTime='" + operaTime + '\'' +
                ", store=" + store +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Merchandise that = (Merchandise) o;
        return Objects.equals(merchandiseId, that.merchandiseId) && Objects.equals(storeId, that.storeId) && Objects.equals(merchandiseName, that.merchandiseName) && Objects.equals(merchandiseMainImage, that.merchandiseMainImage) && Objects.equals(merchandiseParticularsImage, that.merchandiseParticularsImage) && Objects.equals(merchandiseIntroduce, that.merchandiseIntroduce) && Objects.equals(merchandiseParameter, that.merchandiseParameter) && Objects.equals(merchandiseSpecifications, that.merchandiseSpecifications) && Objects.equals(merchandisePrice, that.merchandisePrice) && Objects.equals(merchandiseQuantity, that.merchandiseQuantity) && Objects.equals(merchandiseState, that.merchandiseState) && Objects.equals(operaTime, that.operaTime) && Objects.equals(store, that.store);
    }

    @Override
    public int hashCode() {
        return Objects.hash(merchandiseId, storeId, merchandiseName, merchandiseMainImage, merchandiseParticularsImage, merchandiseIntroduce, merchandiseParameter, merchandiseSpecifications, merchandisePrice, merchandiseQuantity, merchandiseState, operaTime, store);
    }
}