package com.shinowit.actions;

import com.shinowit.entity.TAuMenuInfoEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014-12-08.
 */
public class TestRoleTreeAction {


    @Resource
    private JdbcTemplate jt;
//    private void  querySubmenu(TAuMenuInfoEntity parent_info){
//        String sql="select * from  TAu_MenuInfo where parentid="+parent_info.getParentid();
//        List<TAuMenuInfoEntity> data_list = jt.query(sql, new BeanPropertyRowMapper(TAuMenuInfoEntity.class));
//        for(TAuMenuInfoEntity menu:data_list){
//            parent_info.getChildren().add(menu);
//
//        }
//    }
    @ResponseBody
    public Map<String,Object> getTree(){
        Map<String,Object> resultMap=new HashMap<String, Object>();
        resultMap.put("success",true);
        //去顶级节点
        try {
            List<TAuMenuInfoEntity> map_list = jt.query("select * from TAu_MenuInfo where MenuID in(1,2,3,4,5,6)", new BeanPropertyRowMapper(TAuMenuInfoEntity.class));
            TAuMenuInfoEntity guanli = map_list.get(0);
//            querySubmenu(guanli);
            resultMap.put("data", guanli);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  resultMap;
    }
}
