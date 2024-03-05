package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.User;
import cn.edu.jxnu.mapper.UserMapper;
import cn.edu.jxnu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * #Description ImpUserService
 *
 * @author xh
 * #Date: 2023/3/23 11:05
 */

@Service
public class ImpUserService implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User userLogin(User user) {
        User expectUser;
        List<User> users = userMapper.findUser(user);
        if (users.size() == 0) {
            expectUser = null;
        } else {
            expectUser = users.get(0);
        }
        return expectUser;
    }

    @Override
    public User findUserByUserName(String userName) {
        User expectUser;
        List<User> users = userMapper.findUserByUserName(userName);
        if (users == null || users.size() == 0) {
            expectUser = null;
        } else {
            expectUser = users.get(0);
        }
        return expectUser;
    }

    @Override
    public User findUserByEmail(String email) {
        User expectUser;
        List<User> users = userMapper.findUserByEmail(email);
        if (users == null || users.size() == 0) {
            expectUser = null;
        } else {
            expectUser = users.get(0);
        }
        return expectUser;
    }

    @Override
    public int saveUser(User user) {
        int i = userMapper.insertUser(user);
        return i;
    }

    @Override
    public int changeUserInfo(User user) {
        int u = userMapper.updateUser(user);
        return u;
    }

    @Override
    public String checkPasswordByUserId(Integer userId) {
        String password=userMapper.findPasswordByUserId(userId);
        return password;
    }

    @Override
    public int changePasswordByUserId(User user) {
        int u=userMapper.updatePassword(user);
        return u;
    }
}