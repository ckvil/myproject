package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Collect;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CollectMapper {

    // 根据用户id查看收藏
    public List<Collect> queryCollectByUserId(Integer userId);

    // 根据用户id查看收藏商品
    public List<Collect> queryCollectMerchandiseByUserId(Integer userId);

    // 根据用户id和商品名称模糊查找收藏商品
    public List<Collect> findCollectMerchandiseByStateAndMerchandiseName(Integer userId, String merchandiseName);

    // 根据用户id和商品介绍模糊查找收藏商品
    public List<Collect> findCollectMerchandiseByStateAndMerchandiseIntroduce(Integer userId, String merchandiseIntroduce);

    // 根据用户id查看收藏店铺(用户默认)
    public List<Collect> queryCollectStoreByUserId(Integer userId);

    // 插入收藏(用户默认)
    public int insertCollect(Collect collect);


}
