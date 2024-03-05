package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description CollectStore
 * 收藏店铺类
 * @author xh
 * #Date: 2023/3/23 11:19
 */

public class CollectStore {

    private Integer collectId;
    private Integer storeId;
    private String collectTime;

    private Store store;

    public Integer getCollectId() {
        return collectId;
    }

    public void setCollectId(Integer collectId) {
        this.collectId = collectId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public String getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(String collectTime) {
        this.collectTime = collectTime;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    @Override
    public String toString() {
        return "CollectStore{" +
                "collectId=" + collectId +
                ", storeId=" + storeId +
                ", collectTime='" + collectTime + '\'' +
                ", store=" + store +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CollectStore that = (CollectStore) o;
        return Objects.equals(collectId, that.collectId) && Objects.equals(storeId, that.storeId) && Objects.equals(collectTime, that.collectTime) && Objects.equals(store, that.store);
    }

    @Override
    public int hashCode() {
        return Objects.hash(collectId, storeId, collectTime, store);
    }
}