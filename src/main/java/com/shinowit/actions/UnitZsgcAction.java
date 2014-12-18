package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-16.
 */






public class UnitZsgcAction extends ActionSupport {
    private boolean success;
    private boolean   panduan  ;
    private String message;
    private TMeUnitInfoEntity unit;
    private String unitids;

    public String getUnitids() {
        return unitids;
    }

    public void setUnitids(String unitids) {
        this.unitids = unitids;
    }

    @Resource
    private BaseDAO<TMeUnitInfoEntity> dao;
    private List<TMeUnitInfoEntity> list1;

    public List<TMeUnitInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TMeUnitInfoEntity> list1) {
        this.list1 = list1;
    }

    public String insert(){

        list1=dao.findByExample(TMeUnitInfoEntity.class,unit);
        if(list1.size()>0){
            setSuccess(false);
            setMessage("供货商已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(unit);
        }
        return "ok";
    }
    public String delete(){

        setPanduan(dao.delete(unit));
        if(isPanduan()){
            setSuccess(true);
            message="删除成功";
        }else{
            setSuccess(false);
            message="删除失败";
        }
        return "ok";
    }
    public String deletes(){
        String arr[]=unitids.split(",");
        for(int i =0;i<arr.length;i++){
            int a =dao.extcuteHQL("delete from TMeUnitInfoEntity WHERE unitId=?",Integer.valueOf(arr[i]));
            if(a>0){
                setMessage("删除商品信息成功！");
            }else if(a<0){
                setMessage("删除商品信息失败！");
            }

        }

        return "ok";
    }
    public String update(){
        panduan= dao.update(unit);
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

    public TMeUnitInfoEntity getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfoEntity unit) {
        this.unit = unit;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}
