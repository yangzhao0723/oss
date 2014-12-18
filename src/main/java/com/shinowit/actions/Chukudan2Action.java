package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-01.
 */
public class Chukudan2Action {
    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> dao;
    private String message;

    private int page;
    private int limit;
    private int count;
    private List<TMeOutStockDetailsInfoEntity> mes;
    private TMeOutStockDetailsInfoEntity merchandise1;
    public String select1(){
        mes=dao.queryForPage("from TMeOutStockDetailsInfoEntity where meOutStockInfoByOutBillCode=?", page, limit, merchandise1.getMeOutStockInfoByOutBillCode());
        count=dao.queryRecordCount("select count(*) from TMeOutStockDetailsInfoEntity where  meOutStockInfoByOutBillCode=?",merchandise1.getMeOutStockInfoByOutBillCode());
        return "ok";
    }


    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<TMeOutStockDetailsInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TMeOutStockDetailsInfoEntity> mes) {
        this.mes = mes;
    }

    public TMeOutStockDetailsInfoEntity getMerchandise1() {
        return merchandise1;
    }

    public void setMerchandise1(TMeOutStockDetailsInfoEntity merchandise1) {
        this.merchandise1 = merchandise1;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
