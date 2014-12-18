package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-14.
 */





public class ProstatusZsgcAction extends ActionSupport {
    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TMeProStatusInfoEntity prostatus;
    @Resource
    private BaseDAO<TMeProStatusInfoEntity> dao;
    private List<TMeProStatusInfoEntity> list1;

    public List<TMeProStatusInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TMeProStatusInfoEntity> list1) {
        this.list1 = list1;
    }

    public String insert(){

        list1=dao.findByExample(TMeProStatusInfoEntity.class,prostatus);
        if(list1.size()>0){
            setSuccess(false);
            setMessage("供货商已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(prostatus);
        }
        return "ok";
    }
    public String delete(){

        setPanduan(dao.delete(prostatus));
        if(isPanduan()){
            setSuccess(true);
            message="删除成功";
        }else{
            setSuccess(false);
            message="删除失败";
        }
        return "ok";
    }
    public String update(){
        panduan= dao.update(prostatus);
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

    public TMeProStatusInfoEntity getProstatus() {
        return prostatus;
    }

    public void setProstatus(TMeProStatusInfoEntity prostatus) {
        this.prostatus = prostatus;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}
