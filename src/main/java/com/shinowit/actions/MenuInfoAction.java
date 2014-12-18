//package com.shinowit.actions;
//import com.shinowit.dao.BaseDAO;
//import com.shinowit.entity.TAuAuthorizationEntity;
//import com.shinowit.entity.ZibiaoEntity;
//import javax.annotation.Resource;
//import java.util.List;
//
///**
// * Created by Administrator on 2014-12-03.
// */
////public class CaidanAction {
//
//    @Resource
//    private BaseDAO<ZibiaoEntity> dao;
//    private List<ZibiaoEntity> mes;
//    private TAuAuthorizationEntity aa;
//    @Resource
//    private BaseDAO<TAuAuthorizationEntity> dao1;
//    private List<TAuAuthorizationEntity> mes1;
////    public String select22(){
////        mes=dao.listAll(ZibiaoEntity.class);
////        return"ok";
////    }
//
//        public String select23(){
//            mes1=dao1.findByHql1("from TAuAuthorizationEntity where auRoleInfoByRoleId.roleId=? and isEnabled=true", aa.getAuRoleInfoByRoleId().getRoleId());
//            return"ok";
//        }
//
//    public List<ZibiaoEntity> getMes() {
//        return mes;
//    }
//
//    public void setMes(List<ZibiaoEntity> mes) {
//        this.mes = mes;
//    }
//
//    public TAuAuthorizationEntity getAa() {
//        return aa;
//    }
//
//    public void setAa(TAuAuthorizationEntity aa) {
//        this.aa = aa;
//    }
//
//    public List<TAuAuthorizationEntity> getMes1() {
//        return mes1;
//    }
//
//    public void setMes1(List<TAuAuthorizationEntity> mes1) {
//        this.mes1 = mes1;
//    }
//}
package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;


public class MenuInfoAction extends ActionSupport {
    private TreeNode menulist;
    @Resource
    private MenuDao menuDao;
    private String roleId;
    public String execute() {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession session = request.getSession(false);
     List<TAuOperInfoEntity> www  = (List)session.getAttribute("user");
     for(TAuOperInfoEntity aaa :www) {
         String operId = aaa.getOperId();
         menulist = menuDao.queryModule(operId);
     }

        return SUCCESS;
    }
    public String execute1(){


        menulist = menuDao.queryModule1(roleId);

        return SUCCESS;
    }

    public TreeNode getMenulist() {
        return menulist;
    }

    public void setMenulist(TreeNode menulist) {
        this.menulist = menulist;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
