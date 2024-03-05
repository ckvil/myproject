package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Merchandise;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MerchandiseMapper {

    // 商品列表
    public List<Merchandise> queryMerchandiseList();

    // 根据商品名称或介绍模糊查找商品
    public List<Merchandise> queryMerchandiseByMerchandiseNameOrMerchandiseInduce(String keyword);

    // 根据商品名称模糊查找商品
    public List<Merchandise> queryMerchandiseByMerchandiseName(String merchandiseName);

    // 根据商品介绍模糊查找商品
    public List<Merchandise> queryMerchandiseByMerchandiseIntroduce(String merchandiseIntroduce);

    // 根据商铺名模糊查找商品
    public List<Merchandise> findUserByStoreName(Merchandise merchandise);

    // 根据是商铺id获取商品数量
    public int queryCountByStoreId(Integer storeId);

    // 根据商品id查找商品
    public  List<Merchandise> findByMerchandiseId(Integer merchandiseId);

    // 插入商品
    public int insertMerchandise(Merchandise merchandise);

    // 删除商品
    public int deleteMerchandiseByMerchandiseId(Integer merchandiseId);

    // 更新商品数量
    public int updateMerchandiseQuantityByMerchandiseId(Merchandise merchandise);

    // 更新商品信息
    public int updateMerchandiseByMerchandiseId(Merchandise merchandise);

}
