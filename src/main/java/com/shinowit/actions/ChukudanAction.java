package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;

import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.tools.Cherset;
import com.shinowit.tools.CommonQuery;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-28.
 */
public class ChukudanAction {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao;

    private List<TMeOutStockInfoEntity> mes;
    public List<TMeOutStockInfoEntity> getMes() {
        return mes;
    }
    public void setMes(List<TMeOutStockInfoEntity> mes) {
        this.mes = mes;
    }
    private    int page;
    private   int limit;
    private int count;
    private String id;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String chuku(){

        mes=dao.queryForPage("from TMeOutStockInfoEntity",page,limit);
        count = dao.listAll(TMeOutStockInfoEntity.class).size();

        return "ok";


    }
    private String chaxuncode;//查询的字段

    private String code;       //用户输入的字段
    public String query(){
        CommonQuery cq = new CommonQuery();
        Cherset c =new Cherset();
        code=c.charSet(code);
        String hql = cq.haveCodeHql("TMeOutStockInfoEntity",chaxuncode,code);
        String hqlCount = cq.haveCodeHqlCount("TMeOutStockInfoEntity",chaxuncode,code);
        mes=dao.queryForPage(hql,page,limit);
        count=dao.queryRecordCount(hqlCount);
        return "ok";
    }

    public String getChaxuncode() {
        return chaxuncode;
    }

    public void setChaxuncode(String chaxuncode) {
        this.chaxuncode = chaxuncode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
