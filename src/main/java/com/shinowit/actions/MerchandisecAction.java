package com.shinowit.actions;
import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-14.
 */
import com.shinowit.entity.TMeMerchandiseCInfoEntity;
import com.shinowit.tools.Cherset;
import com.shinowit.tools.CommonQuery;

public class  MerchandisecAction extends ActionSupport {
        @Resource
        private BaseDAO<TMeMerchandiseCInfoEntity> dao;
        private List<TMeMerchandiseCInfoEntity> mes;


        public List<TMeMerchandiseCInfoEntity> getMes() {
            return mes;
        }


        public void setMes(List<TMeMerchandiseCInfoEntity> mes) {
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

        public String merchandisec(){
            try {

            } catch (Exception e) {

                e.printStackTrace();
            }

            if(id!=null){
                mes=dao.queryForPage(" from TMeMerchandiseCInfoEntity",page,limit);
                count=dao.queryRecordCount("select count(*) from TMeMerchandiseCInfoEntity ");
            }else{
                mes=dao.queryForPage("from TMeMerchandiseCInfoEntity",page,limit);
                count = dao.listAll(TMeMerchandiseCInfoEntity.class).size();
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
        String hql = cq.haveCodeHql("TMeMerchandiseCInfoEntity",chaxuncode,code);
        String hqlCount = cq.haveCodeHqlCount("TMeMerchandiseCInfoEntity",chaxuncode,code);
        mes=dao.queryForPage(hql,page,limit);
        count=dao.queryRecordCount(hqlCount);
        return SUCCESS;

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


