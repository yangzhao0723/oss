package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-04.
 */
public class RolecomAction {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;
    private List<TAuRoleInfoEntity> mes;
    public String select(){
        mes=dao.listAll(TAuRoleInfoEntity.class);
        return"ok";
    }

    public List<TAuRoleInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TAuRoleInfoEntity> mes) {
        this.mes = mes;
    }
}

