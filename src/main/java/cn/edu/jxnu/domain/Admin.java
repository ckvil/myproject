package cn.edu.jxnu.domain;

import java.util.Objects;

/**
 * #Description Admin
 * 管理员实体类
 * @author xh
 * #Date: 2023/3/23 11:06
 */

public class Admin {

    private Integer adminId;
    private String adminName;
    private String password;
    private String sex;
    private String birthday;
    private String telephone;
    private String state;

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", adminName='" + adminName + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", birthday='" + birthday + '\'' +
                ", telephone='" + telephone + '\'' +
                ", state='" + state + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return Objects.equals(adminId, admin.adminId) && Objects.equals(adminName, admin.adminName) && Objects.equals(password, admin.password) && Objects.equals(sex, admin.sex) && Objects.equals(birthday, admin.birthday) && Objects.equals(telephone, admin.telephone) && Objects.equals(state, admin.state);
    }

    @Override
    public int hashCode() {
        return Objects.hash(adminId, adminName, password, sex, birthday, telephone, state);
    }
}