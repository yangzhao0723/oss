package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMemberInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-11.
 */
public class MemberZsgcAction  extends ActionSupport {
    private boolean success;
    private String message;
    private boolean panduan;
    private TBaMemberInfoEntity member;
    private List<TBaMemberInfoEntity> list1;
            ;


    @Resource
    private BaseDAO<TBaMemberInfoEntity> dao;
    public String insert(){
        setList1(dao.findByExample(TBaMemberInfoEntity.class,member));
        if(getList1().size()>0){
            setSuccess(false);
            setMessage("会员已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(member);
        }
        return "ok";
    }
    public String delete(){

        setPanduan(dao.delete(member));
        if(isPanduan()){
            setSuccess(true);
            message="删除成功";
        }else{
            setSuccess(false);
            message="删除失败";
        }
        return "ok";
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public TBaMemberInfoEntity getMember() {
        return member;
    }

    public void setMember(TBaMemberInfoEntity member) {
        this.member = member;
    }

    public List<TBaMemberInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TBaMemberInfoEntity> list1) {
        this.list1 = list1;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }

}
