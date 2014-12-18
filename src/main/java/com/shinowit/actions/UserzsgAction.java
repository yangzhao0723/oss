package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;


import javax.annotation.Resource;
import java.util.List;



public class UserzsgAction extends ActionSupport {
    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TAuOperInfoEntity user;
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;
    private List<TAuOperInfoEntity> list1;

    public List<TAuOperInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TAuOperInfoEntity> list1) {
        this.list1 = list1;
    }

    public String insert(){

        list1=dao.findByExample(TAuOperInfoEntity.class,user);
        if(list1.size()>0){
            setSuccess(false);
            setMessage("已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(user);
        }
        return "ok";
    }
    public String delete(){
           int a;
        a=  dao.delBySql("update TAu_OperInfo set state='false' where operId=?",user.getOperId());
        if(a!=0){
            setSuccess(true);
            message="删除成功";
        }else{
            setSuccess(false);
            message="删除失败";
        }
        return "ok";
    }
    public String update(){
        panduan= dao.update(user);
        if(panduan){
            setSuccess(true);
            message="更新成功";
        }else{
            setSuccess(false);
            message="更新失败";
        }
        return "ok";
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

    public TAuOperInfoEntity getUser() {
        return user;
    }

    public void setUser(TAuOperInfoEntity user) {
        this.user = user;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}

