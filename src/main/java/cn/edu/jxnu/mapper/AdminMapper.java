package cn.edu.jxnu.mapper;

import cn.edu.jxnu.domain.Admin;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

    // 查找所有管理员
    public List<Admin> queryAdminList();

    // 根据用户名和密码查找管理员
    public List<Admin> findAdmin(Admin admin);

    // 根据id查找管理员
    public Admin findByAdminId(Integer adminId);

    // 查找管理员的数量
    public int queryAdminCount();

    // 更新管理员密码
    public int updatePassword(Admin admin);

    // 更新管理员信息
    public int updateAdmin(Admin admin);

    // 修改管理员账户状态
    public int updateAdminState(Admin admin);

    // 删除管理员账户
    public int deleteAdmin(Admin admin);

}
