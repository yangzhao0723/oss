package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-25.
 */
public class QuanxianAction {

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;
    private List<TAuOperInfoEntity> mes;
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

    public String userzhanshi() {


            mes = dao.queryForPage("from TAuOperInfoEntity where state=true", page, limit);
//            count = dao.listAll(TAuOperInfoEntity.class).size();
             count = dao.queryRecordCount("select count(*) from TAuOperInfoEntity where state=true");
            return "ok";


    }

    public List<TAuOperInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TAuOperInfoEntity> mes) {
        this.mes = mes;
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
}