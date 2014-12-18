package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfoEntity;
import com.shinowit.tools.Cherset;
import com.shinowit.tools.CommonQuery;
import com.sun.net.httpserver.Authenticator;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-14.
 */




public class UnitAction extends ActionSupport{
    @Resource
    private BaseDAO<TMeUnitInfoEntity> dao;
    private List<TMeUnitInfoEntity> mes;

    private String chaxuncode;//查询的字段

    private String code;       //用户输入的字段

    public List<TMeUnitInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TMeUnitInfoEntity> mes) {
        this.mes = mes;
    }

    private int page;
    private int limit;
    private int count;
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String unit(){
        try {

        } catch (Exception e) {

            e.printStackTrace();
        }

        if(id!=null){
            mes=dao.queryForPage(" from TMeUnitInfoEntity  ",page,limit);
            count=dao.queryRecordCount("select count(*) from TMeUnitInfoEntity ");
        }else{
            mes=dao.queryForPage("from TMeUnitInfoEntity",page,limit);
            count = dao.listAll(TMeUnitInfoEntity.class).size();
            return "ok";
        }

        return "ok";
    }

    public String query(){
        CommonQuery cq = new CommonQuery();
        Cherset c =new Cherset();
        code=c.charSet(code);
        String hql = cq.haveCodeHql("TMeUnitInfoEntity",chaxuncode,code);
        String hqlCount = cq.haveCodeHqlCount("TMeUnitInfoEntity",chaxuncode,code);
        mes=dao.queryForPage(hql,page,limit);
        count=dao.queryRecordCount(hqlCount);
        return SUCCESS;
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
}

