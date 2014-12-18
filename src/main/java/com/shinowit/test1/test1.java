
package com.shinowit.test1;
/**
 * Created by Administrator on 2014-11-06.
 */

import javax.annotation.Resource;


import com.shinowit.entity.*;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})
//public class Test1{
//    @Resource
//    private MenuDao menuDao;
//    private Logger logger = Logger.getLogger(getClass());
//
//    @Test
//    @Transactional
//    public void test(){
//        TreeNode node = menuDao.queryModule("");
//        System.out.print(node.getChildren().size());
//    }
//}

public class test1 {

    @Resource
    private SessionFactory sessionFactory;

    private Logger logger = Logger.getLogger(getClass());

    @Test
//    public void loadTree()throws Exception{
//        System.out.println(JSONUtils.JavaToJson(recursiveTree(1)));
//    }


    public void testMyDao() {
        Session session = this.sessionFactory.openSession();
        try {
            Transaction trans = session.beginTransaction();

           for (int i = 0; i < 100000; i++) {

               /* TAuRoleInfoEntity role = new TAuRoleInfoEntity();
               TAuOperInfoEntity oper55 = new TAuOperInfoEntity();

               oper55.setPwd("123");
               oper55.setAddress("当地");
               oper55.setLinkTel("123");
               oper55.setQq("123");
               oper55.setEmail("123");
               oper55.setMobile("123");
               oper55.setState(true);
               oper55.setOperName(String.valueOf(i));
                role.setRoleId("001");
               oper55.setAuRoleInfoByRoleId(role);
               String  operid1=String.valueOf(i);

               oper55.setOperId(operid1);


               session.save(oper55);*/
               TMeOutStockDetailsInfoEntity aa=new TMeOutStockDetailsInfoEntity();
               TMeOutStockInfoEntity bb=new TMeOutStockInfoEntity();
               TMeMerchandiseInfoEntity cc=new TMeMerchandiseInfoEntity();
               bb.setOutBillCode("3");
               cc.setMerchandiseId("00001");
               aa.setNum(1);
               BigDecimal dd=new BigDecimal("1.000") ;
               aa.setPrice(dd);
               aa.setStockPrice(dd);
              aa.setMeOutStockInfoByOutBillCode(bb);
               aa.setMeMerchandiseInfoByMerchandiseId(cc);

//               TMeMerchandiseCInfoEntity aa= new TMeMerchandiseCInfoEntity();
//               aa.setState(true);
//               aa.setMerchandiseCid(String.valueOf(i));
//               aa.setMerchandiseCName(String.valueOf(i));
//               aa.setSortId(1);
               session.save(aa);
            }
            trans.commit();
            session.close();
//            UuidTestEntity stu=new UuidTestEntity();
//            stu.setName("李四");
//            stu.setTest("test");
//
//            session.save(stu);
//
//            trans.commit();
//
//            session.close();
//
//            logger.debug(stu.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
//        try {
//            org.hibernate.Query query = session.createQuery("from TAuOperInfoEntity ");
//            List<TAuOperInfoEntity> list = query.list();
//            if (list.size() != 0) {
//                for (int i = 0; i < list.size(); i++) {
//                    logger.error(list.get(i).getAddress() + "\t" + list.get(i).getOperName());
//                }
//            }
//        } catch (Exception e) {
//
//        }
    }
}


