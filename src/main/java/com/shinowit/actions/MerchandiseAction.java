package com.shinowit.actions;
//import com.opensymphony.xwork2.ActionSupport;
//import com.shinowit.dao.BaseDAO;
//import com.shinowit.entity.TMeInStockDetailsInfoEntity;
//import javax.annotation.Resource;
//import java.util.List;
//
///**
// * Created by Administrator on 2014-11-11.
// */
//public class MerchandiseAction extends ActionSupport {
//    @Resource
//    private BaseDAO<TMeInStockDetailsInfoEntity> dao;
//    private TMeInStockDetailsInfoEntity shangpin;
//    private List<TMeInStockDetailsInfoEntity> list1;
//
//    public TMeInStockDetailsInfoEntity getShangpin() {
//        return shangpin;
//    }
//
//    public void setShangpin(TMeInStockDetailsInfoEntity shangpin) {
//        this.shangpin = shangpin;
//    }
//
//    public List<TMeInStockDetailsInfoEntity> getList1() {
//        return list1;
//    }
//
//    public void setList1(List<TMeInStockDetailsInfoEntity> list1) {
//        this.list1 = list1;
//    }
//
//    public String select (){
//       // "SELECT a.*, b.blogClassName,c.userName,lable.labelName FROM blog_log_info a INNER JOIN blogclass_info b on a.blogClassId =b.blogClassId INNER JOIN user_info c on a.userId = c.userId INNER JOIN lable on a.lableId = lable.lableId"
//      //   list1=dao.findBySql1("select a.num,a.price ,b.billCode ,c.merchandiseName from TMeInStockDetailsInfoEntity a  inner join TMeInStockInfoEntity b on a.tMeInStockInfoByBillCode=b.billCode inner join TMeMerchandiseInfoEntity c on a.tMeMerchandiseInfoByMerchandiseId=c.merchandiseId");
//       // list1.get(0).gettMeInStockInfoByBillCode();
//     list1=dao.findBySql1("select a.Num,a.Price jinjia,a.MerchandiseID ,b.BillCode,b.InType ,b.InTime,b.Handler,b.TotalMoney,b.Remark,c.MerchandiseName,c.Price ,c.MerchandiseAB,c.Spec ,d.OperName from TMe_InStockDetailsInfo a  inner join TMe_InStockInfo b on a.BillCode = b.BillCode inner join TMe_MerchandiseInfo c on a.MerchandiseID = c.MerchandiseID inner join TAu_OperInfo d on b.OperID=d.OperID ");
//        return "ok";
//    }
//}
import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.*;
import com.shinowit.tools.Cherset;
import com.shinowit.tools.CommonQuery;

import javax.annotation.Resource;
import java.util.List;
public class MerchandiseAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;

    private List<TMeInStockDetailsInfoEntity> mes;
    public List<TMeInStockDetailsInfoEntity> getMes() {
        return mes;
    }
    public void setMes(List<TMeInStockDetailsInfoEntity> mes) {
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

    public String merchandise(){
         //mes=dao.queryForPage( " select a.num,a.price ,a.tMeMerchandiseInfoByMerchandiseId ,b.billCode,b.inType ,b.inTime,b.handler,b.totalMoney,b.remark,c.merchandiseName,c.price ,c.merchandiseAB,c.spec ,d.operName from TMeInStockDetailsInfoEntity  as a  left join TMeInStockInfoEntity as  b with a.tMeInStockInfoByBillCode = b.billCode left join TMeMerchandiseInfoEntity as c with a.tMeMerchandiseInfoByMerchandiseId = c.merchandiseID left join TAuOperInfoEntity as d with b.tAuOperInfoByOperId=d.operId ",page,limit);
           mes=dao.queryForPage("from TMeInStockInfoEntity",page,limit);
        count = dao.listAll(TMeInStockInfoEntity.class).size();
     //       count=dao.queryRecordCount1("select count(*) from (select a.Num,a.Price jinjia,a.MerchandiseID ,b.BillCode,b.InType ,b.InTime,b.Handler,b.TotalMoney,b.Remark,c.MerchandiseName,c.Price ,c.MerchandiseAB,c.Spec ,d.OperName from TMe_InStockDetailsInfo a  inner join TMe_InStockInfo b on a.BillCode = b.BillCode inner join TMe_MerchandiseInfo c on a.MerchandiseID = c.MerchandiseID inner join TAu_OperInfo d on b.OperID=d.OperID) e ");
            return "ok";


    }

    private String chaxuncode;//查询的字段

    private String code;       //用户输入的字段
    public String query(){
        CommonQuery cq = new CommonQuery();
        Cherset c =new Cherset();
        code=c.charSet(code);
        String hql = cq.haveCodeHql("TMeInStockInfoEntity",chaxuncode,code);
        String hqlCount = cq.haveCodeHqlCount("TMeInStockInfoEntity",chaxuncode,code);
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

