package com.shinowit.actions;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-24.
 */
public class MerchandiseInfoAction {

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;

    private String message;

    private int page;
    private int limit;
    private List<TMeInStockDetailsInfoEntity> mes;
    private TMeInStockDetailsInfoEntity merchandise1;
    private int count;
    public String select1(){
        mes=dao.queryForPage(" from TMeInStockDetailsInfoEntity where meInStockInfoByBillCode=?", page, limit,merchandise1.getMeInStockInfoByBillCode());
        count=dao.queryRecordCount("select count(*) from TMeInStockDetailsInfoEntity where  meInStockInfoByBillCode=?",merchandise1.getMeInStockInfoByBillCode());
        return "ok";
    }


    public List<TMeInStockDetailsInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TMeInStockDetailsInfoEntity> mes) {
        this.mes = mes;
    }

    public TMeInStockDetailsInfoEntity getMerchandise1() {
        return merchandise1;
    }

    public void setMerchandise1(TMeInStockDetailsInfoEntity merchandise1) {
        this.merchandise1 = merchandise1;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }



    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
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
}

