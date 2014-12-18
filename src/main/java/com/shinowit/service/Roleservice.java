package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuAuthorizationEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-04.
 */
@Repository
public class Roleservice {
    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;
    @Resource
    private BaseDAO<TAuAuthorizationEntity>dao1;
    @Transactional
    public boolean insert (TAuRoleInfoEntity a,List<TAuAuthorizationEntity> b){
        boolean result = false;
            dao.insert(a);
            for(TAuAuthorizationEntity c:b){
                dao1.insert(c);
            result=true;
        }

      return result;
    }

}
