package com.shinowit.entity;

        import javax.persistence.*;
        import java.util.ArrayList;
        import java.util.Collection;
        import java.util.List;

/**
 * Created by Administrator on 2014-12-03.
 */
@Entity
@Table(name = "TAu_MenuInfo")
public class TAuMenuInfoEntity {
    private Integer id;
    private Integer menuId;
    private String menuName;
    private String url;
    private Integer sortId;
    private Boolean state;
    private String tag;
    private String src;
    private Integer parentid;
    private List<TAuMenuInfoEntity> children =new ArrayList<TAuMenuInfoEntity>();


//    private Collection<TAuAuthorizationEntity> authorizatByMenuId;
//    private Collection<TBaLogInfoEntity> baLogInfosByMenuId;

    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "MenuID")
    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "MenuName")
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    @Basic
    @Column(name = "URL")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @Basic
    @Column(name = "tag")
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Basic
    @Column(name = "src")
    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    @Basic
    @Column(name = "parentId")
    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuMenuInfoEntity that = (TAuMenuInfoEntity) o;

        if (id != that.id) return false;
        if (menuId != null ? !menuId.equals(that.menuId) : that.menuId != null) return false;
        if (menuName != null ? !menuName.equals(that.menuName) : that.menuName != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (src != null ? !src.equals(that.src) : that.src != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;
        if (tag != null ? !tag.equals(that.tag) : that.tag != null) return false;
        if (url != null ? !url.equals(that.url) : that.url != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) id;
        result = 31 * result + (menuId != null ? menuId.hashCode() : 0);
        result = 31 * result + (menuName != null ? menuName.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        result = 31 * result + (tag != null ? tag.hashCode() : 0);
        result = 31 * result + (src != null ? src.hashCode() : 0);
        return result;
    }
//    public List<TAuMenuInfoEntity> getChildren() {
//        return children;
//    }
//
//    public void setChildren(List<TAuMenuInfoEntity> children) {
//        this.children = children;
//    }
    //    public List<TAuMenuInfoEntity> getChildren() {
//        return children;
//    }
//
//    public void setChildren(List<TAuMenuInfoEntity> children) {
//        this.children = children;
//    }

//    @OneToMany(mappedBy = "auMenuInfoBymenuId")
//
//    public Collection<TAuAuthorizationEntity> getAuthorizatByMenuId() {
//        return authorizatByMenuId;
//    }
//
//    public void setAuthorizatByMenuId(Collection<TAuAuthorizationEntity> authorizatByMenuId) {
//        this.authorizatByMenuId = authorizatByMenuId;
//    }
//
//
//
//    @OneToMany(mappedBy = "auMenuInfoByMenuId")
//
//    public Collection<TBaLogInfoEntity> getBaLogInfosByMenuId() {
//        return baLogInfosByMenuId;
//    }
//
//    public void setBaLogInfosByMenuId(Collection<TBaLogInfoEntity> baLogInfosByMenuId) {
//        this.baLogInfosByMenuId = baLogInfosByMenuId;
//    }


}