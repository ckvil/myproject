package cn.edu.jxnu.domain;

import java.util.List;

/**
 * #Description Collect
 * 收藏实体类
 * @author xh
 * #Date: 2023/3/23 11:18
 */

public class Collect {

    private Integer collectId;
    private Integer userId;

    private List<CollectMerchandise> collectMerchandises;

    private List<CollectStore> collectStores;

    public Integer getCollectId() {
        return collectId;
    }

    public void setCollectId(Integer collectId) {
        this.collectId = collectId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<CollectMerchandise> getCollectMerchandises() {
        return collectMerchandises;
    }

    public void setCollectMerchandises(List<CollectMerchandise> collectMerchandises) {
        this.collectMerchandises = collectMerchandises;
    }

    public List<CollectStore> getCollectStores() {
        return collectStores;
    }

    public void setCollectStores(List<CollectStore> collectStores) {
        this.collectStores = collectStores;
    }

    @Override
    public String toString() {
        return "Collect{" +
                "collectId=" + collectId +
                ", userId=" + userId +
                ", collectMerchandises=" + collectMerchandises +
                ", collectStores=" + collectStores +
                '}';
    }
}