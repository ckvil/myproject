package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.Appraise;
import cn.edu.jxnu.domain.Merchandise;
import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.AppraiseService;
import cn.edu.jxnu.service.MerchandiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * #Description MerchandiseController
 *
 * @author xh
 * #Date: 2023/3/24 11:32
 */

@RestController
@RequestMapping("/merchandise")
@SessionAttributes("user")
public class MerchandiseController {

    @Autowired
    MerchandiserService merchandiserService;

    @Autowired
    AppraiseService appraiseService;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");

    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // 获取商品列表
    @RequestMapping(value = "/merchandiseList")
    public Map<String, Object> merchandiseList() {
        Map<String, Object> map = new HashMap<String, Object>();

        List<Merchandise> merchandises = merchandiserService.merchandiseList();

        if (merchandises != null && merchandises.size() != 0) {
            map.put("success", true);
            map.put("merchandises", merchandises);
        } else {
            map.put("success", false);
            map.put("msg", "查找失败~");
        }
        return map;
    }


    // 模糊搜索
    @RequestMapping(value = "/searchMerchandise")
    public Map<String, Object> searchMerchandise(@SessionAttribute(value = "user") User user, @RequestParam(value = "keyword") String keyword) {
        Map<String, Object> map = new HashMap<String, Object>();

        List<Merchandise> merchandises = merchandiserService.searchMerchandise(keyword);

        if (merchandises != null && merchandises.size() != 0) {
            map.put("success", true);
            map.put("merchandises", merchandises);
        } else {
            map.put("success", false);
            map.put("msg", "搜索结果为空~");
        }
        return map;
    }


    @RequestMapping("/addMerchandise")
    public Map<String, Object> addMerchandise(@SessionAttribute(value = "user") User user,
                                              @RequestParam("storeId") Integer storeId,
                                              @RequestParam("merchandiseName") String merchandiseName,
                                              @RequestParam("merchandiseIntroduce") String merchandiseIntroduce,
                                              @RequestParam("merchandiseParameter") String merchandiseParameter,
                                              @RequestParam("merchandiseSpecifications") String merchandiseSpecifications,
                                              @RequestParam("merchandisePrice") String merchandisePrice,
                                              @RequestParam("merchandiseQuantity") Integer merchandiseQuantity,
                                              @RequestParam("file") MultipartFile uploadFile,
                                              @RequestParam("files") MultipartFile[] uploadFiles,
                                              HttpServletRequest req) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {

            String realPath =
                    req.getServletContext().getRealPath("/uploadFile/");
            String format = sdf.format(new Date());
            File folder = new File(realPath + storeId + "/" + format);

            if (!folder.isDirectory()) {
                folder.mkdirs();
            }
            String oldName = uploadFile.getOriginalFilename();
            String newName = UUID.randomUUID().toString() +
                    oldName.substring(oldName.lastIndexOf("."), oldName.length());
            String merchandiseMainImage = "/uploadFile/" + storeId + "/" + format + newName;
            uploadFile.transferTo(new File(realPath + storeId + "/" + format, newName));

            List<String> merchandiseMainImageList = new ArrayList<>();

            for (MultipartFile uploadFile1 : uploadFiles) {

                oldName = uploadFile.getOriginalFilename();
                newName = UUID.randomUUID().toString() +
                        oldName.substring(oldName.lastIndexOf("."), oldName.length());

                uploadFile1.transferTo(new File(realPath + storeId + "/" + format, newName));

                merchandiseMainImageList.add("/uploadFile/" + storeId + "/" + format + newName);

            }

            Merchandise merchandise = new Merchandise();
            merchandise.setStoreId(storeId);
            merchandise.setMerchandiseName(merchandiseName);
            merchandise.setMerchandiseIntroduce(merchandiseIntroduce);
            merchandise.setMerchandiseParameter(merchandiseParameter);
            merchandise.setMerchandiseSpecifications(merchandiseSpecifications);
            merchandise.setMerchandisePrice(merchandisePrice);
            merchandise.setMerchandiseQuantity(merchandiseQuantity);
            merchandise.setOperaTime(sdf2.format(new Date()));
            merchandise.setMerchandiseMainImage(merchandiseMainImage);
            merchandise.setMerchandiseParticularsImage(merchandiseMainImageList.toString().substring(1, merchandiseMainImageList.toString().length() - 1));

            int i = merchandiserService.saveMerchandise(merchandise);

            if (i == 0) {
                map.put("success", false);
                map.put("msg", "添加商品失败~");
            } else {
                map.put("success", true);
                map.put("msg", "添加商品成功~");
            }

        }

        return map;
    }


    @RequestMapping("/editMyMerchandise")
    public Map<String, Object> editMyMerchandise(@SessionAttribute(value = "user") User user,
                                                 @RequestParam(value = "merchandiseId") Integer merchandiseId,
                                                 @RequestParam(value = "storeId") Integer storeId,
                                                 @RequestParam(value = "merchandiseName", required = false) String merchandiseName,
                                                 @RequestParam(value = "merchandiseIntroduce", required = false) String merchandiseIntroduce,
                                                 @RequestParam(value = "merchandiseParameter", required = false) String merchandiseParameter,
                                                 @RequestParam(value = "merchandiseSpecifications", required = false) String merchandiseSpecifications,
                                                 @RequestParam(value = "merchandisePrice", required = false) String merchandisePrice,
                                                 @RequestParam(value = "merchandiseQuantity", required = false) Integer merchandiseQuantity,
                                                 @RequestParam(value = "file", required = false) MultipartFile uploadFile,
                                                 @RequestParam(value = "files", required = false) MultipartFile[] uploadFiles,
                                                 HttpServletRequest req) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {

            String merchandiseMainImage = "";

            if (uploadFile != null && uploadFile.toString().trim() != "") {
                String realPath =
                        req.getServletContext().getRealPath("/uploadFile/");
                String format = sdf.format(new Date());
                File folder = new File(realPath + storeId + "/" + format);

                if (!folder.isDirectory()) {
                    folder.mkdirs();
                }
                String oldName = uploadFile.getOriginalFilename();
                String newName = UUID.randomUUID().toString() +
                        oldName.substring(oldName.lastIndexOf("."), oldName.length());
                merchandiseMainImage = "/uploadFile/" + storeId + "/" + format + newName;
                uploadFile.transferTo(new File(realPath + storeId + "/" + format, newName));

            }

            List<String> merchandiseMainImageList = new ArrayList<>();

            if (uploadFiles != null && uploadFiles.length != 0) {

                for (MultipartFile uploadFile1 : uploadFiles) {

                    String oldName = uploadFile.getOriginalFilename();
                    String newName = UUID.randomUUID().toString() +
                            oldName.substring(oldName.lastIndexOf("."), oldName.length());

                    String realPath =
                            req.getServletContext().getRealPath("/uploadFile/");
                    String format = sdf.format(new Date());

                    uploadFile1.transferTo(new File(realPath + storeId + "/" + format, newName));

                    merchandiseMainImageList.add("/uploadFile/" + storeId + "/" + format + newName);

                }
            }


            Merchandise merchandise = new Merchandise();
            merchandise.setMerchandiseId(merchandiseId);
            merchandise.setStoreId(storeId);
            merchandise.setMerchandiseName(merchandiseName);
            merchandise.setMerchandiseIntroduce(merchandiseIntroduce);
            merchandise.setMerchandiseParameter(merchandiseParameter);
            merchandise.setMerchandiseSpecifications(merchandiseSpecifications);
            merchandise.setMerchandisePrice(merchandisePrice);
            merchandise.setMerchandiseQuantity(merchandiseQuantity);
            merchandise.setMerchandiseMainImage(merchandiseMainImage);
            merchandise.setMerchandiseParticularsImage(merchandiseMainImageList.toString().substring(1, merchandiseMainImageList.toString().length() - 1));
            merchandise.setOperaTime(sdf2.format(new Date()));

            System.out.println(merchandise.getMerchandiseState());
            if (merchandiseQuantity!=null && merchandiseQuantity == 0) {
                merchandise.setMerchandiseState("已售罄");
            }
            else {
                merchandise.setMerchandiseState(null);
            }

            System.out.println("=========================");
            System.out.println(merchandise);

            int u = merchandiserService.editMyMerchandise(merchandise);

            if (u == 0) {
                map.put("success", false);
                map.put("msg", "编辑商品失败~");
            } else {
                map.put("success", true);
                map.put("msg", "编辑商品成功~");
            }

        }

        return map;
    }


    // 下架商品（将库存清为0，并非真正的删除商品）
    @RequestMapping("/deleteMyMerchandise")
    public Map<String, Object> deleteMyMerchandise(@SessionAttribute(value = "user") User user, @RequestParam("merchandiseId") Integer merchandiseId) {
        Map<String, Object> map = new HashMap<String, Object>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Merchandise merchandise = new Merchandise();
            merchandise.setMerchandiseId(merchandiseId);
            merchandise.setMerchandiseQuantity(0);
            merchandise.setOperaTime(sdf2.format(new Date()));

            int u = merchandiserService.deleteMyMerchandise(merchandise);

            if (u == 0) {
                map.put("success", false);
                map.put("msg", "下架商品失败~");
            } else {
                map.put("success", true);
                map.put("msg", "下架商品成功~");
            }
        }

        return map;
    }

    // 商品详情
    @RequestMapping(value = "/merchandiseParticular")
    public Map<String, Object> MerchandiseParticular(@RequestParam(value = "merchandiseId") Integer merchandiseId) {
        Map<String, Object> map = new HashMap<String, Object>();

        Merchandise merchandise = merchandiserService.merchandiseParticular(merchandiseId);

        List<Appraise> appraises = appraiseService.queryByMerchandiseId(merchandiseId);

        String[] images = merchandise.getMerchandiseParticularsImage().split(",");

        String[] specifications = merchandise.getMerchandiseSpecifications().split(",");

        if (merchandise != null) {
            map.put("success", true);
            map.put("merchandise", merchandise);
            map.put("images", images);
            map.put("specifications", specifications);
            map.put("appraises", appraises);
            map.put("msg", "查看成功~");
        } else {
            map.put("success", false);
            map.put("msg", "查看失败~");
        }
        return map;
    }


}