package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfoEntity;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-17.
 */

public class DeliveryZsgcAction extends ActionSupport {
    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TBaDeliveryInfoEntity delivery;
    @Resource
    private BaseDAO<TBaDeliveryInfoEntity> dao;
    private List<TBaDeliveryInfoEntity> list1;

    public List<TBaDeliveryInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TBaDeliveryInfoEntity> list1) {
        this.list1 = list1;
    }

    public String insert(){

        list1=dao.findByExample(TBaDeliveryInfoEntity.class,delivery);
        if(list1.size()>0){
            setSuccess(false);
            setMessage("配送商已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(delivery);
        }
        return "ok";
    }
    public String delete(){

        setPanduan(dao.delete(delivery));
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
        panduan= dao.update(delivery);
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

    public TBaDeliveryInfoEntity getDelivery() {
        return delivery;
    }

    public void setDelivery(TBaDeliveryInfoEntity delivery) {
        this.delivery = delivery;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}

