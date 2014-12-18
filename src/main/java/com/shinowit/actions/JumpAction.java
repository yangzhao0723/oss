package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2014/11/13.
 */
public class JumpAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;
    HttpServletRequest request = ServletActionContext.getRequest();
    private TAuOperInfoEntity oper;
    private boolean success;
    private String message;
    public String jump() {

            return SUCCESS;

    }

    public TAuOperInfoEntity getOper() {
        return oper;
    }

    public void setOper(TAuOperInfoEntity oper) {
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
}
