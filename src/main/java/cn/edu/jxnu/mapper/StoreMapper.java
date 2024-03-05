package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Store;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StoreMapper {

    // 查找所有店铺
    public List<Store> queryStoreList();

    // 根据店铺id查看店铺
    public List<Store> findByStoreId(Integer storeId);

    // 根据店铺名查找店铺
    public List<Store> findByStoreName(String storeName);

    // 插入店铺
    public int insertStore(Store store);

    // 根据用户id查看店铺
    public List<Store> findByUserId(Integer userId);


}
