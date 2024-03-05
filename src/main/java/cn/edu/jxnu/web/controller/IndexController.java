package cn.edu.jxnu.web.controller;

import cn.edu.jxnu.domain.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * #Description IndexController
 *
 * @author xh
 * #Date: 2023/3/26 19:59
 */

@Controller
@SessionAttributes(value = {"user"})
public class IndexController {

    @RequestMapping("/")
    public String index(HttpServletRequest req, Model model){
        User user= (User) req.getSession().getAttribute("user");
        if (user==null){
            user=new User();
        }
        model.addAttribute("user",user);
        return "index";
    }

}