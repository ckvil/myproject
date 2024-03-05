package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Merchandise;
import cn.edu.jxnu.domain.ShoppingCar;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * #Description ShoppingCarMapper
 *
 * @author xh
 * #Date: 2023/4/1 10:04
 */

@Mapper
public interface ShoppingCarMapper {

    // 根据用户id查找购物车商品
    public List<ShoppingCar> findByUserId(Integer userId);

    // 根据用户id查看商品数量
    public int queryCountByUserId(Integer userId);

    // 根据商品名称模糊查找商品
    public List<ShoppingCar> findShoppingCarByMerchandiseName(Integer userId, String merchandiseName);

    // 根据商品介绍模糊查找商品
    public List<ShoppingCar> findShoppingCarByMerchandiseIntroduce(Integer userId, String merchandiseIntroduce);

    // 根据用户id和商品id查找购物车
    public List<ShoppingCar> findShoppingCar(ShoppingCar shoppingCar);

    // 插入到购物车
    public int insertMerchandise(ShoppingCar shoppingCar);

    // 从购物车删除商品
    public int deleteShoppingCar(Integer shoppingCarId);

    //根据购物车id查找购物车商品
    public List<ShoppingCar> findShoppingCarByShoppingCarId(Integer shoppingCarId);

}