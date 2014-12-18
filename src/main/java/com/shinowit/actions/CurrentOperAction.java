package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* Created by Administrator on 2014/11/18.
*/
public class CurrentOperAction extends ActionSupport {
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;
    HttpServletRequest request = ServletActionContext.getRequest();
    private List<TAuOperInfoEntity> oper;
    private List<TAuOperInfoEntity> list;
    private boolean success;
    private String message;


    public String valid() {

        oper = (List) request.getSession().getAttribute("user");
        if (oper == null) {
            return "ok";
        } else {
            setSuccess(true);
            list = oper;
            return SUCCESS;
        }
    }

    public List<TAuOperInfoEntity> getOper() {
        return oper;
    }

    public void setOper(List<TAuOperInfoEntity> oper) {
        this.oper = oper;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<TAuOperInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuOperInfoEntity> list) {
        this.list = list;
    }
}
