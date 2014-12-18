package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */
public class SupplierZsgcAction extends ActionSupport {
    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TBaSupplierInfoEntity supplier;
    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;
    private List<TBaSupplierInfoEntity> list1;

    public String insert(){

        list1=dao.findByExample(TBaSupplierInfoEntity.class,supplier);
        if(list1.size()>0){
            setSuccess(false);
            setMessage("供货商已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(supplier);
        }
        return "ok";
    }
    public String delete(){

        setPanduan(dao.delete(supplier));
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
        panduan= dao.update(supplier);
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

    public TBaSupplierInfoEntity getSupplier() {
        return supplier;
    }

    public void setSupplier(TBaSupplierInfoEntity supplier) {
        this.supplier = supplier;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}
