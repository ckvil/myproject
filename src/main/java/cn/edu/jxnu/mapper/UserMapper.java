package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    // 查找所有用户
    public List<User> queryUserList();

    // 根据用户名和密码查找用户
    public List<User> findUser(User user);

    // 根据用户id查找用户
    public User findByUserId(Integer userId);

    // 根据用户名查找用户
    public List<User> findUserByUserName(String userName);

    // 根据邮箱查找用户
    public List<User> findUserByEmail(String email);

    // 保存用户
    public int insertUser(User user);

    // 根据用户id删除用户
    public int deleteById(Integer userId);

    // 根据用户id更新用户密码
    public int updatePassword(User user);

    // 根据用户id查找用户密码
    public String findPasswordByUserId(Integer userId);

    // 更新用户
    public int updateUser(User user);

    // 更新用户状态
    public int updateUserState(User user);

}