
package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;
import com.shinowit.tools.Cherset;
import com.shinowit.tools.CommonQuery;

import javax.annotation.Resource;

import java.util.List;

/**
 * Created by Administrator on 2014/10/23.
 */
public class SupplierAction {
    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;
    private List<TBaSupplierInfoEntity> mes;
    public List<TBaSupplierInfoEntity> getMes() {
        return mes;
    }
    public void setMes(List<TBaSupplierInfoEntity> mes) {
        this.mes = mes;
    }

    private int page;

    private int limit;

    private int count;

    private String id;

    private String codeName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String ghs(){
        try {

        } catch (Exception e) {

            e.printStackTrace();
        }

        if(id!=null){
            mes=dao.queryForPage(" from TBaSupplierInfoEntity  ",page,limit);
            count=dao.queryRecordCount("select count(*) from TBaSupplierInfoEntity ");
        }else{
            mes=dao.queryForPage("from TBaSupplierInfoEntity",page,limit);
            count = dao.listAll(TBaSupplierInfoEntity.class).size();
            return "ok";
        }

        return "ok";
    }
    private String chaxuncode;//查询的字段

    private String code;       //用户输入的字段
    public String query(){
        CommonQuery cq = new CommonQuery();
        Cherset c =new Cherset();
        code=c.charSet(code);
        String hql = cq.haveCodeHql("TBaSupplierInfoEntity",chaxuncode,code);
        String hqlCount = cq.haveCodeHqlCount("TBaSupplierInfoEntity",chaxuncode,code);
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

