package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description CollectMerchandise
 * 收藏商品类
 * @author xh
 * #Date: 2023/3/23 11:20
 */

public class CollectMerchandise {

    private Integer collectId;
    private Integer merchandiseId;
    private String collectTime;

    private Merchandise merchandise;

    public Integer getCollectId() {
        return collectId;
    }

    public void setCollectId(Integer collectId) {
        this.collectId = collectId;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public String getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(String collectTime) {
        this.collectTime = collectTime;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    @Override
    public String toString() {
        return "CollectMerchandise{" +
                "collectId=" + collectId +
                ", merchandiseId=" + merchandiseId +
                ", collectTime='" + collectTime + '\'' +
                ", merchandise=" + merchandise +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CollectMerchandise that = (CollectMerchandise) o;
        return Objects.equals(collectId, that.collectId) && Objects.equals(merchandiseId, that.merchandiseId) && Objects.equals(collectTime, that.collectTime) && Objects.equals(merchandise, that.merchandise);
    }

    @Override
    public int hashCode() {
        return Objects.hash(collectId, merchandiseId, collectTime, merchandise);
    }
}