package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-08.
 */
public class RolezsgAction  extends ActionSupport {
    private String menuId;
    private String idList;
    private String roleName;
    private String roleid;
    private String state;
    @Resource
    private BaseDAO<TAuRoleInfoEntity> roleDao;
    @Resource
    private BaseDAO<TAuAuthorizationEntity> authorizationDao;

    public String authorizationInsertExecute() {
        TAuRoleInfoEntity role = new TAuRoleInfoEntity();
        role.setRoleId(roleid);
        role.setRoleName(roleName);
        role.setState(true);
        try {
            roleDao.insert(role);
            String strID[] = idList.split(", ");
            for (int i = 0; i < strID.length; i++) {
                TAuMenuInfoEntity menu = new TAuMenuInfoEntity();
                menu.setMenuId(Integer.valueOf(strID[i]));

                TAuAuthorizationEntity auth = new TAuAuthorizationEntity();
                auth.setIsEnabled(true);
                auth.setAuRoleInfoByRoleId(role);
                auth.setAuMenuInfoBymenuId(menu);
                authorizationDao.insert(auth);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
 return "ok";
    }

    public String getIdList() {
        return idList;
    }

    public void setIdList(String idList) {
        this.idList = idList;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }



    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TAuRoleInfoEntity role;


    public String delete (){
        int a;
          a=roleDao.delBySql("update TAu_RoleInfo set state='false' where  RoleId=?;delete TAu_Authorization where RoleId=?",role.getRoleId(),role.getRoleId());
        if(a!=0){
            setSuccess(true);
            message="删除成功";
        }else{
            setSuccess(false);
            message="删除失败";

        }

        return "ok";

    }
    public String update (){
       panduan =  roleDao.update(role);
        if(panduan){
            setSuccess(true);
            message="成功";

        }else{
            setSuccess(false);
            message="失败";
        }
        return "ok";
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TAuRoleInfoEntity getRole() {
        return role;
    }

    public void setRole(TAuRoleInfoEntity role) {
        this.role = role;
    }
}

