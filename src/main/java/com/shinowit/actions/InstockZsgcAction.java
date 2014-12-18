package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMemberInfoEntity;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/13.
 */
public class InstockZsgcAction  extends  SupplierAction{


    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;
    private TMeInStockDetailsInfoEntity instock;
    private List<TMeInStockDetailsInfoEntity> list1;
    private boolean success;
    private String message;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<TMeInStockDetailsInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TMeInStockDetailsInfoEntity> list1) {
        this.list1 = list1;
    }

    public TMeInStockDetailsInfoEntity getInstock() {
        return instock;
    }

    public void setInstock(TMeInStockDetailsInfoEntity instock) {
        this.instock = instock;
    }

    public String insert(){
        setList1(dao.findByExample(TMeInStockDetailsInfoEntity.class,instock));
        if(getList1().size()>0){
            setSuccess(false);
            setMessage("已存在!");

        }else{
            setSuccess(true);
            setMessage("插入成功");
            dao.insert(instock);
        }
        return "ok";
    }


}
