package com.shinowit.tools;

/**
 * Created by Administrator on 2014/11/13.
 */
public class CommonQuery {

    /*
    * 直接查询
    * */
    public String noCodeHql(String str){			//分页查询的hql
        str = " from "+ str +" where 1=1 ";
        return str;
    }

    public String noCodeHqlCount(String str){		//总数
        str = "select count(*) from "+ str +" where 1=1 ";
        return str;
    }

    /*
    *
    * 模糊查询
    * */

    public String haveCodeHql(String str,String s1,String s2){		//有条件的分页查询
        if(s1==null||s1.trim().length()<=0||s2==null||s2.trim().length()<=0){
            str = " from "+ str +" where 1=1 ";
        }else {
            str=" from "+ str +" where 1=1  and "+ s1 +" like '%"+ s2+"%'";
        }

//        str=" from "+ str +" where 1=1  and "+ s1 +" like '%"+ s2+"%'";
        return str;
    }

    public String haveCodeHqlCount(String str,String s1,String s2){
        if(s1==null||s1.trim().length()<=0||s2==null||s2.trim().length()<=0){
            str = " select count(*) from "+ str +" where 1=1 ";
        }else {
            str = " select count(*)  from " + str + " where 1=1  and " + s1 + " like '%" + s2 + "%'";
        }

//        str = " select count(*)  from " + str + " where 1=1  and " + s1 + " like '%" + s2 + "%'";
        return str;
    }
}
