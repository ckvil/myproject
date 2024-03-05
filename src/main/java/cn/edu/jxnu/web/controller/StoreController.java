package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.Store;
import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.MerchandiserService;
import cn.edu.jxnu.service.StoreService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * #Description StoreController
 *
 * @author xh
 * #Date: 2023/3/31 11:41
 */

@RestController
@RequestMapping("/store")
public class StoreController {

    @Autowired
    StoreService storeService;

    @Autowired
    MerchandiserService merchandiserService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");

    @RequestMapping("/myStore")
    public Map<String, Object> myStore(@SessionAttribute(value = "user") User user) {
        Map<String, Object> map = new HashMap<>();
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("open", false);
            map.put("msg", "用户未登录~");
        } else {
            Store store = storeService.myStore(user.getUserId());

            if (store == null) {
                map.put("success", false);
                map.put("open", true);
                map.put("msg", "您暂未开通店铺~");
            } else {
                int merchandiseCount = merchandiserService.merchandiseCount(store.getStoreId());
                map.put("success", true);
                map.put("store", store);
                map.put("merchandiseCount", merchandiseCount);
            }
        }
        return map;
    }

    @RequestMapping("/openStore")
    public Map<String, Object> openStore(@SessionAttribute(value = "user") User user,
                                         @RequestParam("storeName") String storeName,
                                         @RequestParam("storeIntroduce") String storeIntroduce,
                                         @RequestParam("file") MultipartFile uploadFile,
                                         HttpServletRequest req) throws Exception{
        Map<String, Object> map = new HashMap<>();

        // 用户未登录
        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        }
        // 用户已登录
        else {
            // 查找店铺名是否被使用
            Store store = storeService.findStoreByStoreName(storeName);
            if (store != null) {
                map.put("success", false);
                map.put("msg", "店铺名已被使用~");
            } else {
                String realPath =
                        req.getServletContext().getRealPath("/uploadFile/");
                String format = sdf.format(new Date());
                File folder = new File(realPath + format);

                if (!folder.isDirectory()) {
                    folder.mkdirs();
                }
                String oldName = uploadFile.getOriginalFilename();
                String newName = UUID.randomUUID().toString() +
                        oldName.substring(oldName.lastIndexOf("."), oldName.length());
                String storeImage = "/uploadFile/" + format + newName;
                uploadFile.transferTo(new File(realPath + format, newName));

                store=new Store();
                store.setUserId(user.getUserId());
                store.setStoreName(storeName);
                store.setStoreImage(storeImage);
                store.setStoreIntroduce(storeIntroduce);
                System.out.println(store);

                int i = storeService.savaStore(store);
                if (i == 0) {
                    map.put("success", false);
                    map.put("msg", "店铺开通失败~");
                } else {
                    map.put("success", true);
                    map.put("msg", "店铺开通成功~");
                }
            }
        }

        return map;
    }


    @RequestMapping("/storeParticular")
    public Map<String, Object> storeParticular(@SessionAttribute(value = "user") User user, @RequestParam("storeId") Integer storeId) {
        Map<String, Object> map = new HashMap<>();

        Store store = storeService.storeParticular(storeId);

        if (store == null) {
            map.put("success", false);
            map.put("exist", false);
            map.put("msg", "访问出错，店铺不存在~");
        } else if (store.getUserId().equals(user.getUserId())) {
            map.put("success", true);
            map.put("exist", true);
            map.put("isOwn",true);
            map.put("msg", "我的店铺~");
        } else if (store.getMerchandises() == null || store.getMerchandises().size() == 0) {
            map.put("success", false);
            map.put("exist", true);
            map.put("isOwn",false);
            map.put("msg", "店铺商品为空~");
        } else if (store.getMerchandises().get(0).getMerchandiseId() == null) {
            map.put("success", false);
            map.put("exist", true);
            map.put("isOwn",false);
            map.put("msg", "店铺商品为空~");
        } else {
            int merchandiseCount = merchandiserService.merchandiseCount(storeId);
            map.put("success", true);
            map.put("exist", true);
            map.put("isOwn",false);
            map.put("store", store);
            map.put("merchandiseCount", merchandiseCount);
        }

        return map;
    }
}