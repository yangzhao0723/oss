package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;

import javax.annotation.Resource;
import java.util.List;


public class MerchandisecZsgcAction extends ActionSupport {
    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TMeMerchandiseCInfoEntity merchandisec;
    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> dao;
    private List<TMeMerchandiseCInfoEntity> list1;

    public List<TMeMerchandiseCInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TMeMerchandiseCInfoEntity> list1) {
        this.list1 = list1;
    }

    public String insert(){

        list1=dao.findByExample(TMeMerchandiseCInfoEntity.class,merchandisec);
        if(list1.size()>0){
            setSuccess(false);
            setMessage("供货商已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(merchandisec);
        }
        return "ok";
    }
    public String delete(){

        setPanduan(dao.delete(merchandisec));
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
        panduan= dao.update(merchandisec);
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

    public TMeMerchandiseCInfoEntity getMerchandisec() {
        return merchandisec;
    }

    public void setMerchandisec(TMeMerchandiseCInfoEntity merchandisec) {
        this.merchandisec = merchandisec;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}
