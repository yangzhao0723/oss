package com.shinowit.actions;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.outstockservice;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-01.
 */
public class Chukudan3Action {
    @Resource
    private outstockservice dao;
    private TMeOutStockInfoEntity instock1;
    private TMeOutStockDetailsInfoEntity instock2;
    private List<TMeOutStockDetailsInfoEntity> postData;
    private boolean panduan;
    private boolean success;
    private String message;

    public String insert() {
        setSuccess(true);
        setMessage("插入成功");
        dao.insert(instock1, postData);
        return "ok";
    }

    public String detele() {
        panduan = dao.detele(instock1);
        if (isPanduan()) {
            setSuccess(true);
            message = "删除成功";
        } else {
            setSuccess(false);
            message = "删除失败";
        }
        return "ok";
    }

    public String update() {
        panduan = dao.update(instock1, instock2);
        if (isPanduan()) {
            setSuccess(true);
            message = "成功";
        } else {
            setSuccess(false);
            message = "失败";
        }
        return "ok";
    }

    public TMeOutStockInfoEntity getInstock1() {
        return instock1;
    }

    public void setInstock1(TMeOutStockInfoEntity instock1) {
        this.instock1 = instock1;
    }

    public TMeOutStockDetailsInfoEntity getInstock2() {
        return instock2;
    }

    public void setInstock2(TMeOutStockDetailsInfoEntity instock2) {
        this.instock2 = instock2;
    }

    public List<TMeOutStockDetailsInfoEntity> getPostData() {
        return postData;
    }

    public void setPostData(List<TMeOutStockDetailsInfoEntity> postData) {
        this.postData = postData;
    }

    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
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


