package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-18.
 */
public class OpernameAction {
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;
    private List<TAuOperInfoEntity> mes;
    public String select(){
        mes=dao.listAll(TAuOperInfoEntity.class);
        return"ok";
    }

    public List<TAuOperInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TAuOperInfoEntity> mes) {
        this.mes = mes;
    }
}
