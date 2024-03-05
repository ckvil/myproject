package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.Collect;
import cn.edu.jxnu.domain.CollectMerchandise;
import cn.edu.jxnu.domain.CollectStore;
import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.CollectMerchandiseService;
import cn.edu.jxnu.service.CollectService;
import cn.edu.jxnu.service.CollectStoreService;
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
 * #Description CollectController
 *
 * @author xh
 * #Date: 2023/4/2 19:39
 */

@RestController
@RequestMapping("/collect")
public class CollectController {

    @Autowired
    CollectService collectService;

    @Autowired
    CollectMerchandiseService collectMerchandiseService;

    @Autowired
    CollectStoreService collectStoreService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    // 收藏商品列表
    @RequestMapping("/collectMerchandises")
    public Map<String, Object> collectMerchandises(@SessionAttribute(value = "user") User user) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<Collect> collectMerchandises = collectService.collectMerchandiseList(user.getUserId());

            // 没有收藏夹
            if (collectMerchandises == null || collectMerchandises.size() == 0) {
                map.put("success", false);
                map.put("msg", "收藏商品为空，快去添加商品吧~");
            }
            // 有收藏夹没有收藏商品
            else if (collectMerchandises.get(0).getCollectMerchandises() == null || collectMerchandises.get(0).getCollectMerchandises().size() == 0) {
                map.put("success", false);
                map.put("msg", "收藏商品为空，快去添加商品吧~");
            } else if (collectMerchandises.get(0).getCollectMerchandises().get(0).getMerchandiseId() == null) {
                map.put("success", false);
                map.put("msg", "收藏商品为空，快去添加商品吧~");
            }
            // 有收藏夹有商品
            else {
                map.put("success", true);
                map.put("collectMerchandises", collectMerchandises);
            }
        }
        return map;
    }


    // 搜索收藏商品
    @RequestMapping("/searchCollectMerchandises")
    public Map<String, Object> searchCollectMerchandises(@SessionAttribute(value = "user") User user, @RequestParam(value = "keyword") String keyword) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<Collect> collectMerchandises = collectService.searchCollectMerchandises(user.getUserId(),keyword);

            // 没有收藏夹
            if (collectMerchandises == null || collectMerchandises.size() == 0) {
                map.put("success", false);
                map.put("msg", "收藏商品为空，快去添加商品吧~");
            }
            // 有收藏夹没有收藏商品
            else if (collectMerchandises.get(0).getCollectMerchandises() == null || collectMerchandises.get(0).getCollectMerchandises().size() == 0) {
                map.put("success", false);
                map.put("msg", "收藏商品为空，快去添加商品吧~");
            } else if (collectMerchandises.get(0).getCollectMerchandises().get(0).getMerchandise() == null) {
                map.put("success", false);
                map.put("msg", "收藏商品为空，快去添加商品吧~");
            }
            // 有收藏夹有商品
            else {
                map.put("success", true);
                map.put("collectMerchandises", collectMerchandises);
            }
        }
        return map;
    }


    // 查找商品是否收藏
    @RequestMapping("/findCollectMerchandise")
    public Map<String, Object> findCollectMerchandise(@SessionAttribute(value = "user") User user, @RequestParam(value = "merchandiseId") Integer merchandiseId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<Collect> collectMerchandises = collectService.collectMerchandiseList(user.getUserId());

            // 没有收藏夹
            if (collectMerchandises == null || collectMerchandises.size() == 0) {
                map.put("success", false);
                map.put("msg", "商品暂未收藏");
            }
            // 有收藏夹
            else {
                CollectMerchandise collectMerchandise = new CollectMerchandise();
                collectMerchandise.setCollectId(collectMerchandises.get(0).getCollectId());
                collectMerchandise.setMerchandiseId(merchandiseId);

                collectMerchandise = collectMerchandiseService.findCollectMerchandise(collectMerchandise);
                if (collectMerchandise == null) {
                    map.put("success", false);
                    map.put("msg", "商品暂未收藏");
                } else {
                    map.put("success", true);
                    map.put("collectMerchandises", collectMerchandises);
                }

            }
        }
        return map;
    }


    // 收藏商品
    @RequestMapping("/collectMerchandise")
    public Map<String, Object> collectMerchandise(@SessionAttribute(value = "user") User user, @RequestParam(value = "merchandiseId") Integer merchandiseId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Integer collectId = null;
            List<Collect> collects = collectService.queryCollect(user.getUserId());

            // 创建收藏夹，收藏商品
            if (collects == null || collects.size() == 0) {
                Collect collect = new Collect();
                collect.setUserId(user.getUserId());

                //创建收藏
                int i = collectService.creatCollect(collect);

                if (i != 0) {
                    collectId = collectService.queryCollect(user.getUserId()).get(0).getCollectId();
                    CollectMerchandise collectMerchandise = new CollectMerchandise();
                    collectMerchandise.setCollectId(collectId);
                    collectMerchandise.setMerchandiseId(merchandiseId);
                    collectMerchandise.setCollectTime(sdf.format(new Date()));

                    // 收藏商品
                    int i2 = collectService.collectMerchandise(collectMerchandise);
                    map.put("success", true);
                    map.put("flag", true);
                    map.put("msg", "收藏商品成功~");
                } else {
                    map.put("success", false);
                    map.put("msg", "收藏商品失败~");
                }

            }

            // 已有收藏夹
            else {
                collectId = collects.get(0).getCollectId();

                CollectMerchandise collectMerchandise1 = new CollectMerchandise();
                collectMerchandise1.setCollectId(collectId);
                collectMerchandise1.setMerchandiseId(merchandiseId);
                CollectMerchandise collectMerchandise = collectMerchandiseService.findCollectMerchandise(collectMerchandise1);

                // 收藏商品
                if (collectMerchandise == null) {
                    collectMerchandise = new CollectMerchandise();
                    collectMerchandise.setCollectId(collectId);
                    collectMerchandise.setMerchandiseId(merchandiseId);
                    collectMerchandise.setCollectTime(sdf.format(new Date()));

                    int i = collectService.collectMerchandise(collectMerchandise);

                    map.put("success", true);
                    map.put("flag", true);
                    map.put("msg", "收藏商品成功~");
                }

                // 已有商品，取消收藏
                else {
                    int d = collectService.cancelCollectMerchandise(collectMerchandise);
                    map.put("success", true);
                    map.put("flag", false);
                    map.put("msg", "取消收藏商品成功~");
                }
            }
        }
        return map;
    }


    // 收藏店铺列表
    @RequestMapping("/collectStores")
    public Map<String, Object> collectStores(@SessionAttribute(value = "user") User user) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            List<Collect> collectStores = collectService.collectStoreList(user.getUserId());

            // 没有收藏夹
            if (collectStores == null || collectStores.size() == 0) {
                map.put("success", false);
                map.put("msg", "收藏店铺为空，快去添加吧~");
            }
            // 有收藏夹没有收藏商品
            else if (collectStores.get(0).getCollectStores() == null || collectStores.get(0).getCollectStores().size() == 0) {
                map.put("success", false);
                map.put("msg", "收藏店铺为空，快去添加吧~");
            } else if (collectStores.get(0).getCollectStores().get(0).getStoreId() == null) {
                map.put("success", false);
                map.put("msg", "收藏店铺为空，快去添加吧~");
            }
            // 有收藏夹有商品
            else {
                map.put("success", true);
                map.put("collectStores", collectStores);
            }


        }
        return map;
    }

    //收藏店铺
    @RequestMapping("/collectStore")
    public Map<String, Object> collectStore(@SessionAttribute(value = "user") User user, @RequestParam(value = "storeId") Integer storeId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Integer collectId = null;
            List<Collect> collects = collectService.queryCollect(user.getUserId());

            // 没有收藏夹，创建收藏夹
            if (collects == null || collects.size() == 0) {
                Collect collect = new Collect();
                collect.setUserId(user.getUserId());

                int i = collectService.creatCollect(collect);
                // 创建收藏夹成功
                if (i != 0) {
                    collectId = collectService.queryCollect(user.getUserId()).get(0).getCollectId();
                }
                // 创建收藏夹失败
                else {
                    map.put("success", false);
                    map.put("msg", "收藏店铺失败~");
                }
            }
            // 已有收藏夹
            else {
                collectId = collects.get(0).getCollectId();
            }

            CollectStore collectStore = new CollectStore();
            collectStore.setCollectId(collectId);
            collectStore.setStoreId(storeId);
            collectStore.setCollectTime(sdf.format(new Date()));

            CollectStore collectStore1=collectStoreService.findCollectStore(collectStore);
            // 店铺已被收藏
            if (collectStore1!=null){
                map.put("success", false);
                map.put("msg", "店铺已在收藏列表~");
            }
            // 收藏店铺
            else {
                int i = collectService.collectStore(collectStore);
                if (i==0){
                    map.put("success", false);
                    map.put("msg", "收藏店铺失败~");
                }
                else {
                    map.put("success", true);
                    map.put("msg", "收藏店铺成功~");
                }
            }
        }
        return map;
    }


    // 取消收藏店铺
    @RequestMapping("/cancelCollectStore")
    public Map<String, Object> cancelCollectStore(@SessionAttribute(value = "user") User user, @RequestParam(value = "storeId") Integer storeId) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {

            List<Collect> collects = collectService.queryCollect(user.getUserId());
            Integer collectId = collects.get(0).getCollectId();

            CollectStore collectStore = new CollectStore();
            collectStore.setCollectId(collectId);
            collectStore.setStoreId(storeId);

            CollectStore collectStore1=collectStoreService.findCollectStore(collectStore);
            // 店铺未被收藏
            if (collectStore1==null){
                map.put("success", false);
                map.put("msg", "店铺未在收藏列表~");
            }
            // 店铺已被收藏
            else {
                int i = collectService.cancelCollectStore(collectStore);
                if (i==0){
                    map.put("success", false);
                    map.put("msg", "取消收藏店铺失败~");
                }
                else {
                    map.put("success", true);
                    map.put("msg", "取消收藏店铺成功~");
                }
            }
        }
        return map;
    }

}