package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMemberInfoEntity;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */

       import com.shinowit.dao.BaseDAO;
        import com.shinowit.entity.TBaSupplierInfoEntity;
        import javax.annotation.Resource;

        import java.util.List;
public class MemberAction {
    @Resource
    private BaseDAO<TBaMemberInfoEntity> dao;
    private List<TBaMemberInfoEntity> mes;


    public List<TBaMemberInfoEntity> getMes() {
        return mes;
    }


    public void setMes(List<TBaMemberInfoEntity> mes) {
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

    public String member(){
        try {

        } catch (Exception e) {

            e.printStackTrace();
        }
        if(id!=null){
            mes=dao.queryForPage(" from TBaMemberInfoEntity  ",page,limit);
            count=dao.queryRecordCount("select count(*) from TBaMemberInfoEntity ");
        }else{
            mes=dao.queryForPage("from TBaMemberInfoEntity",page,limit);
            count = dao.listAll(TBaMemberInfoEntity.class).size();
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

