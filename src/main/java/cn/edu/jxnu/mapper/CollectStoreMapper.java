package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.CollectStore;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CollectStoreMapper {

    // 根据收藏id和店铺id查找收藏店铺
    public List<CollectStore> findCollectStore(CollectStore collectStore);

    // 插入收藏店铺(用户默认)
    public int insertCollectStore(CollectStore collectStore);

    // 删除收藏店铺(用户默认)
    public int deleteCollectStore(CollectStore collectStore);

}
