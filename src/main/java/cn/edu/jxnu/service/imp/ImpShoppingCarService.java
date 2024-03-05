package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Merchandise;
import cn.edu.jxnu.domain.ShoppingCar;
import cn.edu.jxnu.mapper.ShoppingCarMapper;
import cn.edu.jxnu.service.ShoppingCarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * #Description ImpShoppingCarService
 *
 * @author xh
 * #Date: 2023/4/1 10:07
 */

@Service
public class ImpShoppingCarService implements ShoppingCarService {

    @Autowired
    ShoppingCarMapper shoppingCarMapper;

    @Override
    public List<ShoppingCar> merchandiseList(Integer userId) {
        List<ShoppingCar> shoppingCars = shoppingCarMapper.findByUserId(userId);
        return shoppingCars;
    }

    @Override
    public int merchandiseCount(Integer userId) {
        int count = shoppingCarMapper.queryCountByUserId(userId);
        return count;
    }

    @Override
    public List<ShoppingCar> searchShoppingCar(String keyword, Integer userId) {
        String merchandiseName = "%" + keyword + "%";
        String merchandiseIntroduce = "%" + keyword + "%";

        List<ShoppingCar> shoppingCars1 = shoppingCarMapper.findShoppingCarByMerchandiseName(userId,merchandiseName);
        List<ShoppingCar> shoppingCars2 = shoppingCarMapper.findShoppingCarByMerchandiseIntroduce(userId,merchandiseIntroduce);

        Set<ShoppingCar> shoppingCarSet = new HashSet<>();

        shoppingCarSet.addAll(shoppingCars1);
        shoppingCarSet.addAll(shoppingCars2);

        List<ShoppingCar> shoppingCars = new ArrayList<>(shoppingCarSet);

        return shoppingCars;
    }

    @Override
    public int searchShoppingCarCount(String keyword) {
        return 0;
    }

    @Override
    public ShoppingCar findShoppingCar(ShoppingCar shoppingCar) {
        ShoppingCar expectShoppingCar;
        List<ShoppingCar> shoppingCars = shoppingCarMapper.findShoppingCar(shoppingCar);
        if (shoppingCars == null || shoppingCars.size() == 0) {
            expectShoppingCar = null;
        } else {
            expectShoppingCar = shoppingCars.get(0);
        }
        return expectShoppingCar;
    }

    @Override
    public int addShoppingCar(ShoppingCar shoppingCar) {
        int i=shoppingCarMapper.insertMerchandise(shoppingCar);
        return i;
    }

    @Override
    public int deleteShoppingCar(Integer shoppingCarId) {
        int d=shoppingCarMapper.deleteShoppingCar(shoppingCarId);
        return d;
    }

    @Override
    public ShoppingCar getShoppingCarMassage(Integer shoppingCarId) {
        ShoppingCar expectShoppingCar;
        List<ShoppingCar> shoppingCars=shoppingCarMapper.findShoppingCarByShoppingCarId(shoppingCarId);
        if (shoppingCars==null || shoppingCars.size()==0){
            expectShoppingCar=null;
        }
        else {
            expectShoppingCar=shoppingCars.get(0);
        }
        return expectShoppingCar;
    }
}