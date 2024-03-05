package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * #Description MapperController
 *
 * @author xh
 * #Date: 2023/3/21 13:03
 */

@Controller
public class TsetController {

    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/test")
    @ResponseBody
    public String test() {
        System.out.println("test==========================");
        return "hello world!!!!!!!!!!!!!!!";
    }

    @RequestMapping("/hello")
    public String test1() {
        System.out.println("test1==========================");
        return "hello";
    }

    @RequestMapping("/index1")
    public String index1() {
        System.out.println("test1==========================");
        return "index1";
    }


    @RequestMapping("/queryUser")
    @ResponseBody
    public List<User> queryUser() {
        List<User> users = userMapper.queryUserList();
        System.out.println("queryUser==========================");
        return users;
    }

    @Value("${file-save-path}")
    private String fileSavePath;

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");

    @PostMapping("/upload4")
    public String upload(@RequestParam("uploadFile") MultipartFile uploadFile, HttpServletRequest req) throws IOException {
        String realPath =
                req.getSession().getServletContext().getRealPath("/uploadFile/");
        String format = sdf.format(new Date());
        File folder = new File(realPath + format);
        String filePath = "";
        if (!folder.isDirectory()) {
            folder.mkdirs();
            String oldName = uploadFile.getOriginalFilename();
            String newName = UUID.randomUUID().toString() +
                    oldName.substring(oldName.lastIndexOf("."), oldName.length());
            try {
                uploadFile.transferTo(new File(folder, newName));
                filePath = req.getScheme() + "://" + req.getServerName() + ":" +
                        req.getServerPort() + "/uploadFile/" + format + newName;

                System.out.println(filePath);
            } catch (IOException e) {
                e.printStackTrace();
                return "上传失败! ";
            }
        }
        return filePath;
    }

    @RequestMapping("/upload1")
    @ResponseBody
    public void upload4(MultipartFile uploadFile, HttpServletRequest req) throws IOException {
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
        String imagePath = "/uploadFile/" + format + newName;
        uploadFile.transferTo(new File(realPath + format, newName));
        System.out.println(imagePath);

    }




    @PostMapping("/upload22")
    public String upload22(MultipartFile uploadFile, HttpServletRequest req) {
        String filePath = "";
        String format = sdf.format(new Date());
        File folder = new File(fileSavePath + format);
        if (!folder.isDirectory()) {
            folder.mkdirs();
        }
        String oldName = uploadFile.getOriginalFilename();
        String newName = UUID.randomUUID().toString() +
                oldName.substring(oldName.lastIndexOf("."), oldName.length());
        try {
            uploadFile.transferTo(new File(folder, newName));
            filePath = req.getScheme() + "://" + req.getServerName() + ":" +
                    req.getServerPort() + "/uploadFile/" + format + newName;
        } catch (IOException e) {
            e.printStackTrace();
            return "上传失败! ";
        }
        return filePath;
    }
}

