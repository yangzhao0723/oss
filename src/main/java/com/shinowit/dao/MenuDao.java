package com.shinowit.dao;

import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TreeNode;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
@Repository
public class MenuDao {
    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(TreeNode parentNode, String operid) {
        Session session = sessionFactory.openSession();
        String sql = "select distinct  a.* from TAu_MenuInfo a inner join TAu_Authorization b on a.MenuID=b.MenuID inner join TAu_RoleInfo c on b.RoleID=c.RoleID inner join TAu_OperInfo d on c.RoleID=d.RoleID where a.parentid=? and d.OperID=? ";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
        query.setParameter(0, parentNode.getMenuinfoEntity().getMenuId());
        query.setParameter(1, operid);
        List<TAuMenuInfoEntity> moduleList = query.list();
        session.close();
        for (TAuMenuInfoEntity module : moduleList) {
            TreeNode node = new TreeNode();
            node.setMenuinfoEntity(module);
            parentNode.addChild(node);
            querySubModule(node, operid);
        }
    }

    @Transactional
    public TreeNode queryModule(String operid) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = "SELECT c.* from   TAu_OperInfo d INNER JOIN TAu_RoleInfo a on d.RoleID=a.RoleID INNER JOIN TAU_AUTHORIZATION b on a.RoleID = b.RoleID INNER JOIN   TAu_MenuInfo c ON c.MenuID = b.MenuID where  c.parentId  is null and  d.OperID = ?";
        try {
            Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
            query.setParameter(0, operid);
            List<TAuMenuInfoEntity> menuinfoEntities = query.list();
            session.close();
            for (TAuMenuInfoEntity menuinfoEntity : menuinfoEntities) {
                TreeNode node = new TreeNode();
                node.setMenuinfoEntity(menuinfoEntity);
                result.addChild(node);
                querySubModule(node, operid);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }




    private void querySubModule1(TreeNode parentNode, String roleid) {
        Session session = sessionFactory.openSession();
        String sql = "select distinct  a.* from TAu_MenuInfo a inner join TAu_Authorization b on a.MenuID=b.MenuID inner join TAu_RoleInfo c on b.RoleID=c.RoleID  where a.parentid=? and c.RoleID=? ";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
        query.setParameter(0, parentNode.getMenuinfoEntity().getMenuId());
        query.setParameter(1, roleid);
        List<TAuMenuInfoEntity> moduleList = query.list();
        session.close();
        for (TAuMenuInfoEntity module : moduleList) {
            TreeNode node = new TreeNode();
            node.setMenuinfoEntity(module);
            parentNode.addChild(node);
            querySubModule(node, roleid);
        }
    }


    @Transactional
    public TreeNode queryModule1(String raleId) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
//        String sql = "SELECT c.* from   TAu_OperInfo d INNER JOIN TAu_RoleInfo a on d.RoleID=a.RoleID INNER JOIN TAU_AUTHORIZATION b on a.RoleID = b.RoleID INNER JOIN   TAu_MenuInfo c ON c.MenuID = b.MenuID where  c.parentId  is null and  a.RoleID = ?";
        String sql = "SELECT c.* from   TAu_RoleInfo a INNER JOIN TAU_AUTHORIZATION b on a.RoleID = b.RoleID INNER JOIN TAu_MenuInfo c ON c.MenuID = b.MenuID where  c.parentId is null and a.RoleID = ?";
        try {
            Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
            query.setParameter(0, raleId);
            List<TAuMenuInfoEntity> menuinfoEntities = query.list();
            session.close();
            for (TAuMenuInfoEntity menuinfoEntity : menuinfoEntities) {
                TreeNode node = new TreeNode();
                node.setMenuinfoEntity(menuinfoEntity);
                result.addChild(node);
                querySubModule1(node, raleId);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}

