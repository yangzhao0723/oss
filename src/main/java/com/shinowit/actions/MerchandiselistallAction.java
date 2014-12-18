package com.shinowit.actions;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-19.
 */
public class MerchandiselistallAction {
    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> dao;
    private List<TMeMerchandiseInfoEntity> mes;
    public String select(){
        mes=dao.listAll(TMeMerchandiseInfoEntity.class);
        return"ok";
    }

    public List<TMeMerchandiseInfoEntity> getMes() {
        return mes;
    }

    public void setMes(List<TMeMerchandiseInfoEntity> mes) {
        this.mes = mes;
    }
}
