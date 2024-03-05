package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.Merchandise;
import cn.edu.jxnu.domain.ShoppingCar;

import java.util.List;

public interface ShoppingCarService {

    public List<ShoppingCar> merchandiseList(Integer userId);

    public int merchandiseCount(Integer userId);

    public List<ShoppingCar> searchShoppingCar(String keyword,Integer userId);

    public int searchShoppingCarCount(String keyword);

    public ShoppingCar findShoppingCar(ShoppingCar shoppingCar);

    public int addShoppingCar(ShoppingCar shoppingCar);

    public int deleteShoppingCar(Integer shoppingCarId);

    public ShoppingCar getShoppingCarMassage(Integer shoppingCarId);

}
