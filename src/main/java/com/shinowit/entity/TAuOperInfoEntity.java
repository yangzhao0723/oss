package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TAu_OperInfo")
public class TAuOperInfoEntity {
    private Integer id;
    private String operId;
    private String operName;
    private String pwd;
    private String address;
    private String linkTel;
    private String qq;
    private String email;
    private String mobile;
    private Short sortId;
    private Boolean state;
    private TAuRoleInfoEntity auRoleInfoByRoleId;
    private Collection<TBaLogInfoEntity> baLogInfosByOperId;
    private Collection<TMeInStockInfoEntity> meInStockInfosByOperId;
    private Collection<TMeOrderInfoEntity> meOrderInfosByOperId;
    private Collection<TMeOutStockInfoEntity> meOutStockInfosByOperId;

    @Basic
    @Column(name = "ID",updatable = false,insertable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "OperID")
    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    @Basic
    @Column(name = "OperName")
    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }

    @Basic
    @Column(name = "Pwd")
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuOperInfoEntity that = (TAuOperInfoEntity) o;

        if (id != that.id) return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (linkTel != null ? !linkTel.equals(that.linkTel) : that.linkTel != null) return false;
        if (mobile != null ? !mobile.equals(that.mobile) : that.mobile != null) return false;
        if (operId != null ? !operId.equals(that.operId) : that.operId != null) return false;
        if (operName != null ? !operName.equals(that.operName) : that.operName != null) return false;
        if (pwd != null ? !pwd.equals(that.pwd) : that.pwd != null) return false;
        if (qq != null ? !qq.equals(that.qq) : that.qq != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) id;
        result = 31 * result + (operId != null ? operId.hashCode() : 0);
        result = 31 * result + (operName != null ? operName.hashCode() : 0);
        result = 31 * result + (pwd != null ? pwd.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (linkTel != null ? linkTel.hashCode() : 0);
        result = 31 * result + (qq != null ? qq.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (mobile != null ? mobile.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        return result;
    }



    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfoEntity getAuRoleInfoByRoleId() {
        return auRoleInfoByRoleId;
    }

    public void setAuRoleInfoByRoleId(TAuRoleInfoEntity auRoleInfoByRoleId) {
        this.auRoleInfoByRoleId = auRoleInfoByRoleId;
    }



    @OneToMany(mappedBy = "auOperInfoByOperId")
    public Collection<TBaLogInfoEntity> getBaLogInfosByOperId() {
        return baLogInfosByOperId;
    }

    public void setBaLogInfosByOperId(Collection<TBaLogInfoEntity> baLogInfosByOperId) {
        this.baLogInfosByOperId = baLogInfosByOperId;
    }



    @OneToMany(mappedBy = "auOperInfoByOperId")
    public Collection<TMeInStockInfoEntity> getMeInStockInfosByOperId() {
        return meInStockInfosByOperId;
    }

    public void setMeInStockInfosByOperId(Collection<TMeInStockInfoEntity> meInStockInfosByOperId) {
        this.meInStockInfosByOperId = meInStockInfosByOperId;
    }



    @OneToMany(mappedBy = "auOperInfoByOperId")
    public Collection<TMeOrderInfoEntity> getMeOrderInfosByOperId() {
        return meOrderInfosByOperId;
    }

    public void setMeOrderInfosByOperId(Collection<TMeOrderInfoEntity> meOrderInfosByOperId) {
        this.meOrderInfosByOperId = meOrderInfosByOperId;
    }
    @OneToMany(mappedBy = "auOperInfoByOperId")

    public Collection<TMeOutStockInfoEntity> getMeOutStockInfosByOperId() {
        return meOutStockInfosByOperId;
    }

    public void setMeOutStockInfosByOperId(Collection<TMeOutStockInfoEntity> meOutStockInfosByOperId) {
        this.meOutStockInfosByOperId = meOutStockInfosByOperId;
    }
}
