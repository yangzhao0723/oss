package com.shinowit.actions;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.service.instockservice;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-19.
 */
public class RukudanAction {
    @Resource
    private instockservice dao;
    private TMeInStockInfoEntity instock1;
    private TMeInStockDetailsInfoEntity instock2;
    private List<TMeInStockDetailsInfoEntity> postData;
    private boolean panduan;
    private boolean success;
    private String message;

    public String insert (){
        setSuccess(true);
        setMessage("插入成功");
         dao.insert(instock1,postData);
         return "ok";
    }
    public String detele (){
    panduan= dao.detele(instock1);
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
       panduan= dao.update(instock1,instock2);
        if(isPanduan()){
            setSuccess(true);
            message="成功";
        }else{
            setSuccess(false);
            message="失败";
        }
        return"ok";
    }

    public TMeInStockDetailsInfoEntity getInstock2() {
        return instock2;
    }

    public void setInstock2(TMeInStockDetailsInfoEntity instock2) {
        this.instock2 = instock2;
    }

    public List<TMeInStockDetailsInfoEntity> getPostData() {
        return postData;
    }

    public void setPostData(List<TMeInStockDetailsInfoEntity> postData) {
        this.postData = postData;
    }

    public TMeInStockInfoEntity getInstock1() {
        return instock1;
    }

    public void setInstock1(TMeInStockInfoEntity instock1) {
        this.instock1 = instock1;
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

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }
}