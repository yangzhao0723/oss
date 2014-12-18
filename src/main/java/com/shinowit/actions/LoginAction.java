package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class LoginAction extends ActionSupport {
    private TAuOperInfoEntity oper;
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;
    private List<TAuOperInfoEntity> operlist;
    private boolean success;
    private String message;


    private String validNum;
    HttpServletRequest request = ServletActionContext.getRequest();
    String rand = (String) request.getSession().getAttribute("rand");

    public String OperLogin() {
        operlist =  dao.findByHql1("from TAuOperInfoEntity where operName=? and pwd=?", oper.getOperName(), oper.getPwd());
        if (!rand.equals(validNum)) {
            setSuccess(false);
            message = "验证码错误";
            return SUCCESS;
        } else if (operlist.size() > 0) {
            setSuccess(true);
            ServletActionContext.getRequest().getSession().setAttribute("user",operlist);
            return SUCCESS;
        } else {
            message = "用户名或密码错误！";
            setSuccess(false);
            return SUCCESS;
        }
    }



    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public TAuOperInfoEntity getOper() {
        return oper;
    }

    public void setOper(TAuOperInfoEntity oper) {
        this.oper = oper;
    }

    public List<TAuOperInfoEntity> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfoEntity> operlist) {
        this.operlist = operlist;
    }

    public String getValidNum() {
        return validNum;
    }

    public void setValidNum(String validNum) {
        this.validNum = validNum;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
