package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-19.
 */
@Repository
public class instockservice {
    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao1;
    @Resource
    private BaseDAO<TMeInStockInfoEntity> dao2;
    @Transactional
    public boolean insert ( TMeInStockInfoEntity a,List<TMeInStockDetailsInfoEntity> b) {
        boolean result = false;
        try{
            dao2.insert(a);
            for(TMeInStockDetailsInfoEntity c:b){
               c.setMeInStockInfoByBillCode(a);
                    dao1.insert(c);

            }
            result=true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;

    }
    @Transactional
    public boolean detele (TMeInStockInfoEntity a) {
        List<TMeInStockDetailsInfoEntity> details;
        boolean result = false;
        try{
            details=dao1.findByHql1("from TMeInStockDetailsInfoEntity  where meInStockInfoByBillCode.billCode=? " ,a.getBillCode());
            for(TMeInStockDetailsInfoEntity aa:details){
                dao1.delete(aa);
            }

     dao2.delete(dao2.findById(TMeInStockInfoEntity.class,a.getBillCode())) ;
    result=true;

        }catch(Exception e){
            e.printStackTrace();
        }
        return result;

    }
    @Transactional
    public boolean update ( TMeInStockInfoEntity a,TMeInStockDetailsInfoEntity b) {
        boolean result = false;
        try{
           dao1.update(b);
            dao2.update(a);
            result=true;
        }catch(Exception e){
            e.printStackTrace();
    }
        return result;

    }

}
