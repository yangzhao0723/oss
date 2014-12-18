package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfoEntity {
    private Integer id;
    private String billCode;
    private Integer inType;
    private Timestamp inTime;
    private String handler1;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeInStockDetailsInfoEntity> meInStockDetailsInfosByBillCode;
    private TAuOperInfoEntity auOperInfoByOperId;
    private TBaSupplierInfoEntity baSupplierInfoBySupplierId;

    @Basic
    @Column(name = "ID",insertable=false,updatable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "InType")
    public Integer getInType() {
        return inType;
    }

    public void setInType(Integer inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    public Timestamp getInTime() {
        return inTime;
    }

    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
    }



    @Basic
    @Column(name = "Handler")

    public String getHandler1() {
        return handler1;
    }

    public void setHandler1(String handler1) {
        this.handler1 = handler1;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeInStockInfoEntity that = (TMeInStockInfoEntity) o;

        if (id != that.id) return false;
        if (billCode != null ? !billCode.equals(that.billCode) : that.billCode != null) return false;
        if (handler1 != null ? !handler1.equals(that.handler1) : that.handler1 != null) return false;
        if (inTime != null ? !inTime.equals(that.inTime) : that.inTime != null) return false;
        if (inType != null ? !inType.equals(that.inType) : that.inType != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (billCode != null ? billCode.hashCode() : 0);
        result = 31 * result + (inType != null ? inType.hashCode() : 0);
        result = 31 * result + (inTime != null ? inTime.hashCode() : 0);
        result = 31 * result + (handler1 != null ? handler1.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }



    @OneToMany(mappedBy = "meInStockInfoByBillCode")

    public Collection<TMeInStockDetailsInfoEntity> getMeInStockDetailsInfosByBillCode() {
        return meInStockDetailsInfosByBillCode;
    }

    public void setMeInStockDetailsInfosByBillCode(Collection<TMeInStockDetailsInfoEntity> meInStockDetailsInfosByBillCode) {
        this.meInStockDetailsInfosByBillCode = meInStockDetailsInfosByBillCode;
    }



    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")

    public TAuOperInfoEntity getAuOperInfoByOperId() {
        return auOperInfoByOperId;
    }

    public void setAuOperInfoByOperId(TAuOperInfoEntity auOperInfoByOperId) {
        this.auOperInfoByOperId = auOperInfoByOperId;
    }
    @ManyToOne
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")

    public TBaSupplierInfoEntity getBaSupplierInfoBySupplierId() {
        return baSupplierInfoBySupplierId;
    }

    public void setBaSupplierInfoBySupplierId(TBaSupplierInfoEntity baSupplierInfoBySupplierId) {
        this.baSupplierInfoBySupplierId = baSupplierInfoBySupplierId;
    }
}
