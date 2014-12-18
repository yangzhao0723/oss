package com.shinowit.actions;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeStockInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-24.
 */
public class Chuku4Action {

    @Resource
    private BaseDAO<TMeStockInfoEntity> dao;
    private boolean panduan;
    private String message;
    private boolean success;
    private List<TMeStockInfoEntity> mes;
    private TMeStockInfoEntity kuncun;
    public String kucunselect(){

        mes=dao.findByHql1(" from TMeStockInfoEntity where meMerchandiseInfoByMerchandiseId.merchandiseId=?",kuncun.getMeMerchandiseInfoByMerchandiseId().getMerchandiseId());
        return "ok";
    }


    public boolean isPanduan() {
        return panduan;
    }

    public void setPanduan(boolean panduan) {
        this.panduan = panduan;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<TMeStockInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TMeStockInfoEntity> mes) {
        this.mes = mes;
    }

    public TMeStockInfoEntity getKuncun() {
        return kuncun;
    }

    public void setKuncun(TMeStockInfoEntity kuncun) {
        this.kuncun = kuncun;
    }
}

