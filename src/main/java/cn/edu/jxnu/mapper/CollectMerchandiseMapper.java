package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.CollectMerchandise;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CollectMerchandiseMapper {

    // 根据收藏id和商品id查找收藏商品
    public List<CollectMerchandise> findCollectMerchandise(CollectMerchandise collectMerchandise);

    // 插入收藏商品(用户默认)
    public int insertCollectMerchandise(CollectMerchandise collectMerchandise);

    // 删除收藏商品(用户默认)
    public int deleteCollectMerchandise(CollectMerchandise collectMerchandise);

}
