package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-14.
 */










/**
 * Created by Administrator on 2014/10/23.
 */
public class  ProstatusAction{
    @Resource
    private BaseDAO<TMeProStatusInfoEntity> dao;
    private List<TMeProStatusInfoEntity> mes;


    public List<TMeProStatusInfoEntity> getMes() {
        return mes;
    }


    public void setMes(List<TMeProStatusInfoEntity> mes) {
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

    public String prostatus(){
        try {

        } catch (Exception e) {

            e.printStackTrace();
        }

        if(id!=null){
            mes=dao.queryForPage(" from TMeProStatusInfoEntity  ",page,limit);
            count=dao.queryRecordCount("select count(*) from TMeProStatusInfoEntity ");
        }else{
            mes=dao.queryForPage("from TMeProStatusInfoEntity",page,limit);
            count = dao.listAll(TMeProStatusInfoEntity.class).size();
            return "ok";
        }

        return "ok";
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


