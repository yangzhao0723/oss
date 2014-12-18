package com.shinowit.actions;

/**
 * Created by Administrator on 2014-12-04.
 */

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;
import java.util.List;

public class RoleAction {
    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;
    private List<TAuRoleInfoEntity> mes;
    private int page;
    private int limit;
    private int count1;
    private String id;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String rolezhanshi() {

        mes = dao.queryForPage("from TAuRoleInfoEntity where state=true", page, limit);
        count1 = dao.queryRecordCount("select count(*) from TAuRoleInfoEntity where state = true");
        return "ok";


    }

//    private TAuRoleInfoEntity role;
//    private boolean success;
//    private String message;
//    public String insert (){
//        setSuccess(true);
//        setMessage("插入成功");
//        dao.insert(role);
//        return "ok";
//    }

    public List<TAuRoleInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TAuRoleInfoEntity> mes) {
        this.mes = mes;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getCount1() {
        return count1;
    }

    public void setCount1(int count1) {
        this.count1 = count1;
    }

    //    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//
//    public boolean isSuccess() {
//        return success;
//    }
//
//    public void setSuccess(boolean success) {
//        this.success = success;
//    }
//
//    public TAuRoleInfoEntity getRole() {
//        return role;
//    }
//
//    public void setRole(TAuRoleInfoEntity role) {
//        this.role = role;
//    }


}
