package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.User;

public interface UserService {

    public User userLogin(User user);

    public User findUserByUserName(String userName);

    public User findUserByEmail(String email);

    public int saveUser(User user);

    public int changeUserInfo(User user);

    public String checkPasswordByUserId(Integer userId);

    public int changePasswordByUserId(User user);
}
