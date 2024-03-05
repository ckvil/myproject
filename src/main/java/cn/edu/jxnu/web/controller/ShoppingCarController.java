package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.Merchandise;
import cn.edu.jxnu.domain.ShoppingCar;
import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.MerchandiserService;
import cn.edu.jxnu.service.ShoppingCarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * #Description ShoppingCarController
 *
 * @author xh
 * #Date: 2023/4/1 10:00
 */

@RestController
@RequestMapping("/shoppingCar")
public class ShoppingCarController {

    @Autowired
    MerchandiserService merchandiserService;

    @Autowired
    ShoppingCarService shoppingCarService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @RequestMapping("/merchandiseList")
    public Map<String, Object> merchandise(@SessionAttribute(value = "user") User user) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<ShoppingCar> shoppingCars = shoppingCarService.merchandiseList(user.getUserId());

            int merchandiseCount = shoppingCarService.merchandiseCount(user.getUserId());

            if (shoppingCars == null || shoppingCars.size() == 0) {
                map.put("success", false);
                map.put("msg", "购物车为空，快去添加商品吧~");
            } else {
                map.put("success", true);
                map.put("shoppingCars", shoppingCars);
                map.put("merchandiseCount", merchandiseCount);
            }
        }
        return map;
    }

    @RequestMapping("/searchShoppingCar")
    public Map<String, Object> searchShoppingCar(@SessionAttribute(value = "user") User user, @RequestParam(value = "keyword") String keyword) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<ShoppingCar> shoppingCars = shoppingCarService.searchShoppingCar(keyword, user.getUserId());

            System.out.println(shoppingCars.size());

            if (shoppingCars == null || shoppingCars.size() == 0) {
                map.put("success", false);
                map.put("msg", "搜索结果为空~");
            }
            else if (shoppingCars.get(0).getMerchandise()==null || shoppingCars.get(0).getMerchandise().getMerchandiseId()==null){
                map.put("success", false);
                map.put("msg", "搜索结果为空~");
            }
            else {
                map.put("success", true);
                map.put("shoppingCars", shoppingCars);
            }
        }
        return map;
    }

    @RequestMapping("/addShoppingCar")
    public Map<String, Object> addShoppingCar(@SessionAttribute(value = "user") User user, @RequestParam(value = "merchandiseId") Integer merchandiseId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Merchandise merchandise = merchandiserService.findMerchandise(merchandiseId);
            if (merchandise == null) {
                map.put("success", false);
                map.put("msg", "商品不存在，请联系商家~");
            } else {
                ShoppingCar shoppingCar = new ShoppingCar();
                shoppingCar.setUserId(user.getUserId());
                shoppingCar.setMerchandiseId(merchandiseId);
                shoppingCar.setOperaTime(sdf.format(new Date()));

                ShoppingCar shoppingCar1 = shoppingCarService.findShoppingCar(shoppingCar);
                if (shoppingCar1 == null) {
                    int i = shoppingCarService.addShoppingCar(shoppingCar);
                    if (i == 0) {
                        map.put("success", false);
                        map.put("msg", "添加失败~");
                    } else {
                        map.put("success", true);
                        map.put("merchandise", merchandise);
                        map.put("shoppingCar", shoppingCar);
                        map.put("msg", "添加成功~");
                    }
                } else {
                    map.put("success", false);
                    map.put("msg", "商品已存在购物车~");
                }
            }
        }
        return map;
    }

    @RequestMapping("/deleteMerchandise")
    public Map<String, Object> deleteMerchandise(@SessionAttribute(value = "user") User user,
                                                 @RequestParam(value = "shoppingCarId") Integer shoppingCarId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            int d = shoppingCarService.deleteShoppingCar(shoppingCarId);
            if (d == 0) {
                map.put("success", false);
                map.put("msg", "删除失败~");
            } else {
                map.put("success", true);
                map.put("msg", "删除成功~");
            }
        }
        return map;
    }


    @RequestMapping("/submitShoppingCarOrder")
    public Map<String, Object> submitShoppingCarOrder(@SessionAttribute(value = "user") User user,
                                                 @RequestParam(value = "shoppingCarId") Integer shoppingCarId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            ShoppingCar shoppingCar = shoppingCarService.getShoppingCarMassage(shoppingCarId);

            String[] specifications = shoppingCar.getMerchandise().getMerchandiseSpecifications().split(",");

            if (shoppingCar == null) {
                map.put("success", false);
                map.put("msg", "查找失败~");
            }
            else if (shoppingCar.getMerchandise().getMerchandiseId()==null){
                map.put("success", false);
                map.put("msg", "查找失败~");
            }
            else {
                map.put("success", true);
                map.put("shoppingCar", shoppingCar);
                map.put("specifications", specifications);
                map.put("msg", "查找成功~");
            }
        }
        return map;
    }


}