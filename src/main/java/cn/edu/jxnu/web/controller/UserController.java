package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.service.UserService;
import cn.edu.jxnu.util.CodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * #Description UserController
 *
 * @author xh
 * #Date: 2023/3/23 10:51
 */

@RestController
@RequestMapping("/user")
@SessionAttributes("user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/getUserSession")
    public Map<String, Object> getUserSession(@SessionAttribute(value = "user") User user) {
        Map<String, Object> map = new HashMap<>();

        if (user.getUserName() != null) {
            map.put("success", true);
            map.put("user", user);
        } else {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        }
        return map;
    }


    @RequestMapping("/login")
    public Map<String, Object> login(@RequestParam(value = "name") String userName, @RequestParam(value = "pwd") String password, HttpServletRequest req, Model model) {
        Map<String, Object> map = new HashMap<>();

        User user = new User();
        user.setUserName(userName);
        user.setPassword(password);

        // 验证码错误
        if (!CodeUtil.checkVerifyCode(req)) {
            map.put("success", false);
            map.put("msg", "验证码错误");
        }
        // 账号或者密码为空
        else if (userName == null || password == null || userName.trim().equals("") || password.trim().equals("")) {
            map.put("success", false);
            map.put("msg", "账号或密码为空");
        }
        // 账号或密码错误
        else if ((user = userService.userLogin(user)) == null) {
            map.put("success", false);
            map.put("msg", "账号或密码错误");
        } else {
            map.put("success", true);
            map.put("msg", "登录成功");
            map.put("name", userName);
            user.setPassword("***");
            if (user.getTelephone()!=null && user.getTelephone().length()!=0){
                user.setTelephone(user.getTelephone().substring(0, 3) + "****" + user.getTelephone().substring(7, 11));
            }


            System.out.println(user);
            model.addAttribute("user", user);
        }

        return map;
    }


    @RequestMapping("/register")
    public Map<String, Object> register(@RequestParam(value = "name") String userName, @RequestParam(value = "pwd") String password, @RequestParam(value = "email") String email, HttpServletRequest req, Model model) {
        Map<String, Object> map = new HashMap<>();

        User user = new User();
        user.setUserName(userName);
        user.setPassword(password);
        user.setEmail(email);

        // 验证码错误
        if (!CodeUtil.checkVerifyCode(req)) {
            map.put("success", false);
            map.put("msg", "验证码错误");
        }
        // 开始注册
        else {
            //  查看该用户名和邮箱是否已存在
            User user1 = userService.findUserByUserName(userName);
            User user2 = userService.findUserByEmail(email);
            if (user1 != null) {
                map.put("success", false);
                map.put("msg", "用户名已存在~");
            } else if (user2 != null) {
                map.put("success", false);
                map.put("msg", "邮箱已被使用已存在~");
            } else {
                int i = userService.saveUser(user);
                // 注册失败
                if (i == 0) {
                    map.put("success", false);
                    map.put("msg", "注册失败~");
                } else {
                    user = userService.userLogin(user);
                    map.put("success", true);
                    map.put("msg", "注册成功");
                    map.put("name", userName);
                    user.setPassword("***");
                    model.addAttribute("user", user);
                }
            }

        }

        return map;
    }

    @RequestMapping("/loginout")
    public Map<String, Object> loginout(@SessionAttribute(value = "user") User user, Model model) {
        Map<String, Object> map = new HashMap<>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            user = new User();
            model.addAttribute("user", user);
            map.put("success", true);
            map.put("msg", "注销成功~");
        }
        return map;
    }

    @RequestMapping("/changeInfo")
    public Map<String, Object> changeInfo(@SessionAttribute(value = "user") User user,
                                          @RequestParam(value = "userName") String userName,
                                          @RequestParam(value = "sex") String sex,
                                          @RequestParam(value = "birthday") String birthday,
                                          @RequestParam(value = "introduce") String introduce) {
        Map<String, Object> map = new HashMap<>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            user.setUserName(userName);
            user.setSex(sex);
            user.setBirthday(birthday);
            user.setIntroduce(introduce);

            int u = userService.changeUserInfo(user);

            if (u == 0) {
                map.put("success", false);
                map.put("msg", "更新失败~");
            } else {
                map.put("success", true);
                map.put("msg", "更新成功~");
            }
        }
        return map;
    }


    @RequestMapping("/checkPassword")
    public Map<String, Object> checkPassword(@SessionAttribute(value = "user") User user,
                                             @RequestParam(value = "password") String password) {
        Map<String, Object> map = new HashMap<>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            Integer userId = user.getUserId();
            String truePassword=userService.checkPasswordByUserId(userId);

            if (truePassword.equals(password)) {
                map.put("success", true);
                map.put("msg", "密码确认成功~");
            } else {
                map.put("success", false);
                map.put("msg", "密码确认失败~");
            }
        }
        return map;
    }


    @RequestMapping("/changePassword")
    public Map<String, Object> changePassword(@SessionAttribute(value = "user") User user,
                                             @RequestParam(value = "password") String password) {
        Map<String, Object> map = new HashMap<>();

        if (user.getUserName() == null) {
            map.put("success", false);
            map.put("msg", "用户未登录~");
        } else {
            user.setPassword(password);

            int u=userService.changePasswordByUserId(user);

            if (u==0) {
                map.put("success", false);
                map.put("msg", "密码修改失败~");
            } else {
                map.put("success", true);
                map.put("msg", "密码修改成功~");
            }
        }
        return map;
    }


}